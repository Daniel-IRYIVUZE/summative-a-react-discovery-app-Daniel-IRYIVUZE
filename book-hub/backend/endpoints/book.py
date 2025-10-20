from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional

from db.session import SessionLocal
from models.book import Book, CartItem, ServiceRequest
from schemas.book import (
    BookCreate, BookUpdate, BookOut,
    CartItemCreate, CartItemUpdate, CartItemOut,
    ServiceRequestCreate, ServiceRequestUpdate, ServiceRequestOut
)
from core.security import decode_access_token
from fastapi.security import OAuth2PasswordBearer

# Routers
books_router = APIRouter(prefix="/books", tags=["Books"])
cart_router = APIRouter(prefix="/cart", tags=["Cart"])
service_requests_router = APIRouter(prefix="/service-requests", tags=["Service Requests"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Auth dependency
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_access_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
        return email
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

# =========================================================================
# BOOKS ENDPOINTS
# =========================================================================

# -------------------------------
# CREATE
# -------------------------------
@books_router.post("/", response_model=BookOut, status_code=status.HTTP_201_CREATED)
def create_book(
    book_in: BookCreate, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    book = Book(**book_in.dict())
    db.add(book)
    db.commit()
    db.refresh(book)
    return BookOut.from_orm(book)

# -------------------------------
# READ - List with pagination & filters
# -------------------------------
@books_router.get("/", response_model=dict)
def list_books(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = Query(10, le=100),
    title: Optional[str] = None,
    author: Optional[str] = None,
    # current_user: str = Depends(get_current_user)
):
    query = db.query(Book)

    if title:
        query = query.filter(Book.title.ilike(f"%{title}%"))
    if author:
        query = query.filter(Book.author.ilike(f"%{author}%"))

    total = query.count()
    books = query.offset(skip).limit(limit).all()

    book_list = [BookOut.from_orm(b) for b in books]
    return {"total": total, "items": book_list}

# -------------------------------
# READ - Single book
# -------------------------------
@books_router.get("/{book_id}", response_model=BookOut)
def get_book(
    book_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return BookOut.from_orm(book)

# -------------------------------
# UPDATE
# -------------------------------
@books_router.put("/{book_id}", response_model=BookOut)
def update_book(
    book_id: int, 
    book_in: BookUpdate, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    for key, value in book_in.dict(exclude_unset=True).items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)
    return BookOut.from_orm(book)

# -------------------------------
# DELETE
# -------------------------------
@books_router.delete("/{book_id}")
def delete_book(
    book_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(book)
    db.commit()
    return {"message": "Book deleted successfully"}

# =========================================================================
# CART ITEMS ENDPOINTS
# =========================================================================

# -------------------------------
# CREATE
# -------------------------------
@cart_router.post("/", response_model=CartItemOut, status_code=status.HTTP_201_CREATED)
def create_cart_item(
    cart_item_in: CartItemCreate, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    # Check if item already exists in cart
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == cart_item_in.user_id,
        CartItem.book_id == cart_item_in.book_id
    ).first()
    
    if existing_item:
        existing_item.quantity += cart_item_in.quantity
        db.commit()
        db.refresh(existing_item)
        return CartItemOut.from_orm(existing_item)
    
    cart_item = CartItem(**cart_item_in.dict())
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return CartItemOut.from_orm(cart_item)

# -------------------------------
# READ - List cart items for user
# -------------------------------
@cart_router.get("/user/{user_id}", response_model=dict)
def list_cart_items(
    user_id: int,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = Query(50, le=100),
    # current_user: str = Depends(get_current_user)
):
    query = db.query(CartItem).filter(CartItem.user_id == user_id)

    total = query.count()
    cart_items = query.offset(skip).limit(limit).all()

    cart_item_list = [CartItemOut.from_orm(item) for item in cart_items]
    return {"total": total, "items": cart_item_list}

# -------------------------------
# READ - Single cart item
# -------------------------------
@cart_router.get("/{cart_item_id}", response_model=CartItemOut)
def get_cart_item(
    cart_item_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return CartItemOut.from_orm(cart_item)

# -------------------------------
# UPDATE
# -------------------------------
@cart_router.put("/{cart_item_id}", response_model=CartItemOut)
def update_cart_item(
    cart_item_id: int, 
    cart_item_in: CartItemUpdate, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    for key, value in cart_item_in.dict(exclude_unset=True).items():
        setattr(cart_item, key, value)

    db.commit()
    db.refresh(cart_item)
    return CartItemOut.from_orm(cart_item)

# -------------------------------
# DELETE
# -------------------------------
@cart_router.delete("/{cart_item_id}")
def delete_cart_item(
    cart_item_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(cart_item)
    db.commit()
    return {"message": "Cart item deleted successfully"}

# -------------------------------
# CLEAR USER CART
# -------------------------------
@cart_router.delete("/user/{user_id}/clear")
def clear_user_cart(
    user_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.commit()
    return {"message": "User cart cleared successfully"}

# =========================================================================
# SERVICE REQUESTS ENDPOINTS
# =========================================================================

# -------------------------------
# CREATE
# -------------------------------
@service_requests_router.post("/", response_model=ServiceRequestOut, status_code=status.HTTP_201_CREATED)
def create_service_request(
    service_request_in: ServiceRequestCreate, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    service_request = ServiceRequest(**service_request_in.dict())
    db.add(service_request)
    db.commit()
    db.refresh(service_request)
    return ServiceRequestOut.from_orm(service_request)

# -------------------------------
# READ - List with pagination & filters
# -------------------------------
@service_requests_router.get("/", response_model=dict)
def list_service_requests(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = Query(10, le=100),
    user_id: Optional[int] = None,
    status: Optional[str] = None,
    title: Optional[str] = None,
    # current_user: str = Depends(get_current_user)
):
    query = db.query(ServiceRequest)

    if user_id:
        query = query.filter(ServiceRequest.user_id == user_id)
    if status:
        query = query.filter(ServiceRequest.status == status)
    if title:
        query = query.filter(ServiceRequest.title.ilike(f"%{title}%"))

    total = query.count()
    service_requests = query.offset(skip).limit(limit).all()

    service_request_list = [ServiceRequestOut.from_orm(sr) for sr in service_requests]
    return {"total": total, "items": service_request_list}

# -------------------------------
# READ - Single service request
# -------------------------------
@service_requests_router.get("/{request_id}", response_model=ServiceRequestOut)
def get_service_request(
    request_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    service_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")
    return ServiceRequestOut.from_orm(service_request)

# -------------------------------
# UPDATE
# -------------------------------
@service_requests_router.put("/{request_id}", response_model=ServiceRequestOut)
def update_service_request(
    request_id: int, 
    service_request_in: ServiceRequestUpdate, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    service_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")

    for key, value in service_request_in.dict(exclude_unset=True).items():
        setattr(service_request, key, value)

    db.commit()
    db.refresh(service_request)
    return ServiceRequestOut.from_orm(service_request)

# -------------------------------
# UPDATE STATUS
# -------------------------------
@service_requests_router.patch("/{request_id}/status")
def update_service_request_status(
    request_id: int,
    status: str,
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    service_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")

    service_request.status = status
    db.commit()
    db.refresh(service_request)
    return {"message": "Status updated successfully", "status": status}

# -------------------------------
# DELETE
# -------------------------------
@service_requests_router.delete("/{request_id}")
def delete_service_request(
    request_id: int, 
    db: Session = Depends(get_db),
    # current_user: str = Depends(get_current_user)
):
    service_request = db.query(ServiceRequest).filter(ServiceRequest.id == request_id).first()
    if not service_request:
        raise HTTPException(status_code=404, detail="Service request not found")

    db.delete(service_request)
    db.commit()
    return {"message": "Service request deleted successfully"}
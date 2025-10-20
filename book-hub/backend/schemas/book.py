from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

# =========================================================================
# BOOK SCHEMAS
# =========================================================================

class BookBase(BaseModel):
    title: str
    author: str
    genre: str
    publication_date: str
    price: float
    rating: float
    description: str
    image: str
    isbn: str
    pages: int
    language: str
    publisher: str
    stock: int

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    genre: Optional[str] = None
    publication_date: Optional[str] = None
    price: Optional[float] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    image: Optional[str] = None
    isbn: Optional[str] = None
    pages: Optional[int] = None
    language: Optional[str] = None
    publisher: Optional[str] = None
    stock: Optional[int] = None

class BookOut(BookBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# =========================================================================
# CART ITEM SCHEMAS
# =========================================================================

class CartItemBase(BaseModel):
    user_id: int
    book_id: int
    quantity: int = 1

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: Optional[int] = None

class CartItemOut(CartItemBase):
    id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# =========================================================================
# SERVICE REQUEST SCHEMAS
# =========================================================================

class ServiceRequestBase(BaseModel):
    user_id: int
    title: str
    author: str
    genre: str
    description: str
    price: float
    contact_email: str

class ServiceRequestCreate(ServiceRequestBase):
    pass

class ServiceRequestUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    genre: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    contact_email: Optional[str] = None
    status: Optional[str] = None

class ServiceRequestOut(ServiceRequestBase):
    id: int
    status: str
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
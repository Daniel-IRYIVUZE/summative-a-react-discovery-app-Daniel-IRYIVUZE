from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.session import Base, engine
from endpoints import auth, book

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize the app
app = FastAPI(title="Book Hub Backend APIs")

# ✅ Add CORS middleware (Allow all origins, methods, and headers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods: GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allow all headers (Authorization, Content-Type, etc.)
)

# Include routers
app.include_router(auth.router)
app.include_router(book.books_router)
app.include_router(book.cart_router)
app.include_router(book.service_requests_router)

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI JWT + Book Management"}

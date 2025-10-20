from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime
from db.session import Base



class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index=True)
    genre = Column(String)
    publication_date = Column(String)
    price = Column(Float)
    rating = Column(Float)
    description = Column(Text)
    image = Column(String)
    isbn = Column(String, unique=True)
    pages = Column(Integer)
    language = Column(String)
    publisher = Column(String)
    stock = Column(Integer)

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    book_id = Column(Integer)
    quantity = Column(Integer, default=1)


class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    title = Column(String)
    author = Column(String)
    genre = Column(String)
    description = Column(Text)
    price = Column(Float)
    contact_email = Column(String)
    status = Column(String, default="pending")
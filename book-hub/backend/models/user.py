from sqlalchemy import Column, Integer, String, Boolean
from db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String(250))
    first_name = Column(String(250))
    last_name = Column(String(250))
    is_active = Column(Boolean, default=True)
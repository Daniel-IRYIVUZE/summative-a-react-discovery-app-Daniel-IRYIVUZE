from pydantic import BaseModel, EmailStr, constr
from typing import Optional

# Request model for login
class LoginRequest(BaseModel):
    email: EmailStr
    password: str  # Will truncate before hashing

# Request model for user registration
class UserCreate(BaseModel):
    email: EmailStr
    # Max 72 characters for bcrypt
    password: constr(min_length=6, max_length=72)
    first_name: str
    last_name: str

# Response model for user data
class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    is_active: bool

    class Config:
        orm_mode = True

# Response model for access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Optional token payload
class TokenData(BaseModel):
    email: Optional[str] = None

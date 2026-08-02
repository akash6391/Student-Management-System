from pydantic import BaseModel,EmailStr
from enum import Enum
# define for validation
class UserRole(str, Enum):
    Admin = "Admin"
    Teacher = "Teacher"
    Student = "Student"
    Parent = "Parent"


class UserBase(BaseModel):
    email: EmailStr
    role: UserRole  
class UserCreate(UserBase):
    name : str
    email : str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    name : str
    email : str
    is_active: bool

    class Config:
        from_attributes = True
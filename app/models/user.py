from sqlalchemy import Column,Integer,String,Enum,Boolean
import enum
from app.database import Base
from sqlalchemy.orm import relationship

class UserRole(String,enum.Enum):
    Admin = "Admin"
    Teacher = "Teacher"
    Student = "Student"
    Parent = "Parent"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hash_password = Column(String,nullable=False)
    role = Column(Enum(UserRole),nullable=False)
    is_active = Column(Boolean,default=False)    

    # Relationship
    student_profile = relationship("Student", back_populates="user", uselist=False)
    parent_profile = relationship("Parent", back_populates="user", uselist=False)
    teacher_profile = relationship("Teacher", back_populates="user", uselist=False)
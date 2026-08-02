from app.database import Base
from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from .parent_student_link import parent_student_link

class Parent(Base):
    __tablename__ = "parents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    father_name = Column(String)
    mother_name = Column(String)
    phone = Column(String)

    # Relationships
    user = relationship("User", back_populates="parent_profile")
    children = relationship("Student", secondary=parent_student_link, back_populates="parents")
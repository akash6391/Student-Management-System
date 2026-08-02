from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from .parent_student_link import parent_student_link

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key = True, index = True)
    roll_number = Column(Integer, unique = True,index = True)
    name = Column(String, index = True)
    age = Column(Integer)
    contact_number = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    address = Column(String)
    class_name = Column(String)

    # Relationship
    user = relationship("User", back_populates="student_profile")
    parents = relationship("Parent", secondary=parent_student_link, back_populates="children")
    attendance_records = relationship("Attendance", back_populates="student")
    grades = relationship("Grade", back_populates="student")    
from sqlalchemy import Column,Integer,String,ForeignKey
from app. database import Base
from sqlalchemy.orm import relationship

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    class_name = Column(String)
    teacher_id = Column(Integer, ForeignKey("teachers.id"))

    # Relationship

    teacher = relationship("Teacher",back_populates="subjects")      
    grades = relationship("Grade",back_populates="subject")
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Grade(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    exam_type = Column(String)
    marks_obtained = Column(Integer)
    total_marks = Column(Integer)
    remarks = Column(String)

    # Relationship    
    student = relationship("Student", back_populates="grades")
    subject = relationship("Subject", back_populates="grades")
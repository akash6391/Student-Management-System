from sqlalchemy import Column,Integer,String,ForeignKey,DATE
from app.database import Base
from sqlalchemy.orm import relationship


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer,primary_key=True,index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    date = Column(DATE)  # Example Format: "YYYY-MM-DD"
    status = Column(String)  # "Present" or "Absent"
    marked_by_teacher_id = Column(Integer, ForeignKey("teachers.id"))

    # Relationship
    student = relationship("Student",back_populates="attendance_records")
from sqlalchemy import Column,Integer,String,ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    employee_id = Column(String, unique=True, index=True)
    department = Column(String)

    # Relationship
    user = relationship("User",back_populates="teacher_profile")
    subjects = relationship("Subject",back_populates="teacher")    
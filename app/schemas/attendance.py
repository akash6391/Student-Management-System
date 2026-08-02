from pydantic import BaseModel 
from datetime import date

class AttendanceBase(BaseModel):
    date: str
    status: str

class AttendanceCreate(AttendanceBase):

    student_id: int
    date : date
    status : str
    

class AttendanceResponse(AttendanceBase):
    id: int
    student_id: int
    marked_by_teacher_id: int

    class Config:
        from_attributes = True
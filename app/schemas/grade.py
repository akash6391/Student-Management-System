from pydantic import BaseModel
from typing import Optional

class GradeBase(BaseModel):
    exam_type: str
    marks_obtained: int
    total_marks: int
    remarks: Optional[str] = None

class GradeCreate(GradeBase):
    student_id: int
    subject_id: int

class GradeResponse(GradeBase):
    id: int
    student_id: int
    subject_id: int

    class Config:
        from_attributes = True
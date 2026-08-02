from pydantic import BaseModel

class TeacherBase(BaseModel):
    employee_id: str
    department: str

class TeacherCreate(TeacherBase):
    user_id: int

class TeacherResponse(TeacherBase):
    id: int
    name: str
    user_id: int

    class Config:
        from_attributes = True
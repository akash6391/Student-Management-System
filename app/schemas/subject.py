from pydantic import BaseModel

class SubjectCreate(BaseModel):
    name: str
    teacher_id: int


class SubjectResponse(BaseModel):
    id: int
    name: str
    teacher_name: str | None = None

    class Config:
        from_attributes = True
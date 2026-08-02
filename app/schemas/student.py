from pydantic import BaseModel

class StudentBase(BaseModel):
    
    name: str
    roll_number : int
    age : int
    contact_number : str
    class_name: str
    address : str

class StudentCreate(StudentBase):
    user_id: int  # Kis user account se link karna hai
    

class StudentResponse(StudentBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
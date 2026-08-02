from pydantic import BaseModel,EmailStr

class parent(BaseModel):
    id : int
    user_id : int
    father_name : str
    mother_name : str
    phone : int

class ParentRegistration(BaseModel):
    email: str
    password: str
    father_name: str
    mother_name: str
    phone: str   
class ParentResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    father_name: str
    mother_name: str
    phone: str
    model_config = {
        "from_attributes": True
                  }
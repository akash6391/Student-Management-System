from pydantic import BaseModel,EmailStr

class TeacherRegistration(BaseModel):
        name: str
        email: str
        password: str
        employee_id: str
        department: str

class StudentRegistration(BaseModel):
    # User table
    name: str
    email: EmailStr
    password: str

    # Student table
    roll_number: int
    age: int
    contact_number: str
    address: str
    class_name: str       

class ParentRegistration(BaseModel):
    name: str
    email: EmailStr
    password: str
    father_name: str
    mother_name: str
    phone: str 

class ParentStudentLink(BaseModel):
    parent_id: int
    student_id: int    
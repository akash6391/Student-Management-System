from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import EmailStr
from app.dependencies import get_db
from app.dependencies.role_cheaker import allow_admin,allow_admin_or_teacher
from app.models.user import User, UserRole
from app.models.teacher import Teacher
from app.schemas.admin import TeacherRegistration,StudentRegistration,ParentRegistration,ParentStudentLink
from app.models.student import Student
from app.utils import security
from typing import List
from app.schemas.teacher import TeacherResponse
from app.schemas.student import StudentResponse
from app.schemas.parent import ParentResponse
from app.models.parent import Parent
from sqlalchemy.orm import joinedload
from app.models.subject import Subject
from app.schemas.subject import SubjectCreate, SubjectResponse

router = APIRouter()


@router.post("/teacher/register", dependencies=[Depends(allow_admin)])
def register_teacher(
    data: TeacherRegistration,
    db: Session = Depends(get_db)
):

    # Check email
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists!")

    # Check employee ID
    existing_teacher = db.query(Teacher).filter(Teacher.employee_id == data.employee_id).first()

    if existing_teacher:
        raise HTTPException(
            status_code=400,
            detail="Employee ID already exists!")

    try:
        # Hash Password
        hashed_pw = security.get_password_hash(data.password)

        # Create User
        new_user = User(
            name=data.name,
            email=data.email,
            hash_password=hashed_pw,
            role=UserRole.Teacher)

        db.add(new_user)
        # Generate user id
        db.flush()

        # Create Teacher Profile
        new_teacher = Teacher(
            user_id=new_user.id,
            employee_id=data.employee_id,
            department=data.department
        )
        db.add(new_teacher)
        # Save both tables
        db.commit()

        db.refresh(new_user)
        db.refresh(new_teacher)

        return {
            "message": "Teacher registered successfully",
            "user_id": new_user.id,
            "teacher_id": new_teacher.id,
            "name": new_user.name,
            "email": new_user.email
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500,detail=str(e))

@router.post("/student/register", dependencies=[Depends(allow_admin)])
def register_student(
    data: StudentRegistration,
    db: Session = Depends(get_db)
):  
    # Check email
    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user :
        raise HTTPException(status_code=400,detail="email already exists")

    existing_roll_number = db.query(Student).filter(Student.roll_number == data.roll_number).first()
    if existing_roll_number:
        raise HTTPException(status_code=400,detail="roll number already registered")

    try :
        hashed_pw = security.get_password_hash(data.password)
        new_user = User(name = data.name,email=data.email,hash_password=hashed_pw,role=UserRole.Student)

        db.add(new_user)
        db.flush()
        new_student = Student(roll_number = data.roll_number,name = data.name,age = data.age,contact_number = data.contact_number,user_id = new_user.id,address = data.address,class_name = data.class_name)
        db.add(new_student)
        db.commit()

        return {"message":"Student successfully addad","student_id":new_student.id,"name":new_student.name}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500,detail=f"traction failed!. Rolled back. Error : {e}")





@router.post("/add-parent")
def add_parent(
    data: ParentRegistration, 
    db: Session = Depends(get_db), 
    current_admin: User = Depends(allow_admin)):

    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="email already exists!")

    try:
        
        hashed_pw = security.get_password_hash(data.password)
        new_user = User(email=data.email,name=data.name, hash_password=hashed_pw, role=UserRole.Parent)
        db.add(new_user)
        db.flush()

        
        new_parent = Parent(
            user_id=new_user.id,
            father_name=data.father_name,
            mother_name=data.mother_name,
            phone=data.phone
        )
        db.add(new_parent)

        db.commit()
        return {"message": "Parent successfully added!", "parent_id": new_parent.id, "email": new_user.email}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Transaction failed. Rolled back. Error: {str(e)}")
 
@router.post("/add-subject", response_model=SubjectResponse)
def add_subject(
    subject: SubjectCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(allow_admin)
):
    new_subject = Subject(**subject.model_dump())
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)
    return new_subject

@router.get("/subjects", response_model=list[SubjectResponse])
def get_subjects(
    db: Session = Depends(get_db),
    current_admin: User = Depends(allow_admin)
):
    subjects = db.query(Subject).all()

    data = []

    for subject in subjects:
        data.append({
            "id": subject.id,
            "name": subject.name,
            "teacher_name": subject.teacher.user.name if subject.teacher else None
        })

    return data


@router.get("/students",response_model=List[StudentResponse])
def get_all_students(db : Session = Depends(get_db),current_admin : User = Depends(allow_admin_or_teacher)):
    return db.query(Student).all()

@router.get("/teachers", response_model=List[TeacherResponse])
def get_all_teachers(
    db: Session = Depends(get_db),
    current_admin: User = Depends(allow_admin)
):
    teachers = db.query(Teacher).all()

    result = []

    for teacher in teachers:
        result.append({
            "id": teacher.id,
            "user_id": teacher.user_id,
            "name": teacher.user.name,
            "employee_id": teacher.employee_id,
            "department": teacher.department
        })

    return result
@router.get("/parents", response_model=List[ParentResponse])
def get_all_parents(
    db: Session = Depends(get_db),
    current_admin: User = Depends(allow_admin)
):
    parents = (
        db.query(Parent).options(joinedload(Parent.user)).all())

    result = []

    for parent in parents:
        result.append(
            ParentResponse(
                id=parent.id,
                name=parent.user.name,
                email=parent.user.email,
                father_name=parent.father_name,
                mother_name=parent.mother_name,
                phone=parent.phone,
            )
        )

    return result
@router.post("/link-parent-student")
def link_parent_student(
    data: ParentStudentLink,
    db: Session = Depends(get_db),
    current_admin: User = Depends(allow_admin)
):
    parent = db.query(Parent).filter(Parent.id == data.parent_id).first()

    student = db.query(Student).filter(Student.id == data.student_id).first()

    if not parent or not student:
        raise HTTPException(404, "Parent or Student not found")

    parent.children.append(student)

    db.commit()

    return {"message": "Linked successfully"}

@router.get("/dashboard")
def admin_dashboard(
    db: Session = Depends(get_db),
    current_admin: User = Depends(allow_admin)
):
    return {
        "students": db.query(Student).count(),
        "teachers": db.query(Teacher).count(),
        "parents": db.query(Parent).count(),
        "subjects": db.query(Subject).count(),
    }

@router.delete("/deactivate-user/{email}")
def deactivate_user(email : EmailStr,db : Session = Depends(get_db),current_admin : User = Depends(allow_admin)):
    print("Received email:", email)
    user = db.query(User).filter(User.email == email).first()
    print("User:", user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found in database!")
        
    if user.role == UserRole.Admin:
        raise HTTPException(status_code=400, detail="You can not deactivate admin")

    user.is_active = False
    db.commit()
    db.refresh(user)
    
    return {"message": f"User '{email}' has been deactivated now he can not login"}
        
      

       
        
        

      

    
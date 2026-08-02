from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.get_db import get_db
from app.dependencies.role_cheaker import allow_teacher

from app.models.user import User
from app.models.teacher import Teacher
from app.models.subject import Subject
from app.models.attendance import Attendance
from app.models.grade import Grade
from app.models.student import Student

from app.schemas.attendance import AttendanceCreate
from app.schemas.grade import GradeCreate, GradeResponse


router = APIRouter(prefix="/teacher", tags=["Teacher Dashboard"])
from app.utils.email import send_absent_email

# Teacher Dashboard

@router.get("/dashboard")
def teacher_dashboard(
    db: Session = Depends(get_db),
    current_teacher: User = Depends(allow_teacher)
):
    teacher = (
        db.query(Teacher)
        .filter(Teacher.user_id == current_teacher.id)
        .first()
    )

    if not teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher profile not found"
        )

    # Total subjects handled by teacher
    total_subjects = (
        db.query(Subject)
        .filter(Subject.teacher_id == teacher.id)
        .count()
    )

    # Total attendance marked by teacher
    attendance_marked = (
        db.query(Attendance)
        .filter(Attendance.marked_by_teacher_id == teacher.id)
        .count()
    )

    # Total grades uploaded by teacher
    grades_uploaded = (
        db.query(Grade)
        .join(Subject, Grade.subject_id == Subject.id)
        .filter(Subject.teacher_id == teacher.id)
        .count()
    )

    return {
        "teacher_name": current_teacher.name,
        "employee_id": teacher.employee_id,
        "department": teacher.department,
        "subjects": total_subjects,
        "attendance_marked": attendance_marked,
        "grades_uploaded": grades_uploaded
    }

# Mark Attendance

@router.post("/mark-attendance")
async def  mark_attendance(
    attendance_data: AttendanceCreate,
    db: Session = Depends(get_db),
    current_teacher: User = Depends(allow_teacher)
):

    student = db.query(Student).filter(
        Student.id == attendance_data.student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found!"
        )

    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_teacher.id
    ).first()

    if not teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher profile not found"
        )

    existing_record = db.query(Attendance).filter(
        Attendance.student_id == attendance_data.student_id,
        Attendance.date == attendance_data.date
    ).first()

    if existing_record:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked."
        )

    new_attendance = Attendance(
        student_id=attendance_data.student_id,
        date=attendance_data.date,
        status=attendance_data.status,
        marked_by_teacher_id=teacher.id
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    if attendance_data.status.lower() == "absent":

        for parent in student.parents:

            await send_absent_email(
                parent_email=parent.user.email,
                student_name=student.user.name,
                date=str(attendance_data.date)
            )
            print("Email sent successfully")
    print("Returning response")
    return {
        "message": "Attendance marked successfully",
        "attendance": new_attendance
    }


# Upload Grades
@router.get("/students")
def get_teacher_students(
    db: Session = Depends(get_db),
    current_user: User = Depends(allow_teacher)
):
    students = db.query(Student).all()

    return students
@router.get("/my-subjects")
def get_my_subjects(
    db: Session = Depends(get_db),
    current_user: User = Depends(allow_teacher)
):
    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher not found"
        )

    subjects = db.query(Subject).filter(
        Subject.teacher_id == teacher.id
    ).all()

    return subjects
@router.post("/upload_grade", response_model=GradeResponse)
def upload_grade(
    grade_data: GradeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(allow_teacher)
):

    teacher = db.query(Teacher).filter(
        Teacher.user_id == current_user.id
    ).first()

    if not teacher:
        raise HTTPException(
            status_code=404,
            detail="Teacher not found!"
        )

    student = db.query(Student).filter(
        Student.id == grade_data.student_id
    ).first()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found!"
        )

    subject = db.query(Subject).filter(
        Subject.id == grade_data.subject_id
    ).first()

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found!"
        )

    if subject.teacher_id != teacher.id:
        raise HTTPException(
            status_code=403,
            detail="You can upload marks only for your own subject."
        )

    existing_grade = db.query(Grade).filter(
        Grade.student_id == grade_data.student_id,
        Grade.subject_id == grade_data.subject_id,
        Grade.exam_type == grade_data.exam_type
    ).first()

    if existing_grade:
        raise HTTPException(
            status_code=400,
            detail="Grade already uploaded for this exam."
        )

    new_grade = Grade(
        student_id=grade_data.student_id,
        subject_id=grade_data.subject_id,
        exam_type=grade_data.exam_type,
        marks_obtained=grade_data.marks_obtained,
        total_marks=grade_data.total_marks,
        remarks=grade_data.remarks
    )

    db.add(new_grade)
    db.commit()
    db.refresh(new_grade)

    return new_grade
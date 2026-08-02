from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.role_cheaker import allow_student
from app.dependencies.get_db import get_db

from app.models.user import User
from app.models.student import Student
from app.models.attendance import Attendance
from app.models.grade import Grade

router = APIRouter(prefix="/student")


@router.get("/dashboard")
def student_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(allow_student)
):
    # Student Profile
    student = (
        db.query(Student)
        .filter(Student.user_id == current_user.id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    #  Attendance 

    attendance_records = (
        db.query(Attendance)
        .filter(Attendance.student_id == student.id)
        .all()
    )

    total_days = len(attendance_records)

    present_days = len([
        a for a in attendance_records
        if a.status.lower() == "present"
    ])

    attendance_percentage = (
        round((present_days / total_days) * 100, 2)
        if total_days > 0
        else 0
    )

    #  Grades 
    grades = (
        db.query(Grade)
        .filter(Grade.student_id == student.id)
        .all()
    )

    total_subjects = len(grades)
    obtained_marks = sum(
        grade.marks_obtained
        for grade in grades
    )
    maximum_marks = sum(
        grade.total_marks
        for grade in grades
    )
    overall_percentage = (
        round((obtained_marks / maximum_marks) * 100, 2)
        if maximum_marks > 0
        else 0
    )

    return {
        "student_name": student.name,
        "class": student.class_name,

        "attendance_percentage": attendance_percentage,

        "subjects": total_subjects,

        "obtained_marks": obtained_marks,

        "maximum_marks": maximum_marks,

        "overall_percentage": overall_percentage
    }

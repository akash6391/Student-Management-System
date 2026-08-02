from fastapi import BackgroundTasks
from fastapi import APIRouter,Depends
from app.models.student import Student
from app.dependencies.get_db import get_db
from app.dependencies.role_cheaker import allow_teacher
from sqlalchemy.orm import Session
from app.schemas.attendance import AttendanceCreate
from app.models.user import User
from app.models.attendance import Attendance
from app.models.parent import Parent



router = APIRouter()



@router.post("/mark-attendance")
async def mark_attendance(
    attendance_data: AttendanceCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_teacher: User = Depends(allow_teacher),
):
    student = (
    db.query(Student)
    .filter(Student.id == attendance_data.student_id)
    .first()
)
    if attendance_data.status == "Absent":

        parent = student.parent

        background_tasks.add_task(
            send_absent_email,
            parent.email,
            parent.name,
            student.name,
            str(attendance_data.date),
        )
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.dependencies.role_cheaker import allow_parent

from app.models.user import User
from app.models.parent import Parent
from app.models.attendance import Attendance
from app.models.grade import Grade

router = APIRouter(prefix="/parent", tags=["Parent"])

# Parent Dashboard

@router.get("/dashboard")
def parent_dashboard(
    db: Session = Depends(get_db),
    current_parent: User = Depends(allow_parent)
):
    parent = db.query(Parent).filter(
        Parent.user_id == current_parent.id
    ).first()

    if not parent:
        raise HTTPException(
            status_code=404,
            detail="Parent not found"
        )

    return {
        "name": current_parent.name,
        "email": current_parent.email,
        "father_name": parent.father_name,
        "mother_name": parent.mother_name,
        "phone": parent.phone,
        "total_children": len(parent.children)
    }

# My Children

@router.get("/my-children")
def my_children(
    db: Session = Depends(get_db),
    current_parent: User = Depends(allow_parent)
):
    parent = db.query(Parent).filter(
        Parent.user_id == current_parent.id
    ).first()

    if not parent:
        raise HTTPException(
            status_code=404,
            detail="Parent not found"
        )

    children = []

    for child in parent.children:

        children.append({
            "student_id": child.id,
            "name": child.name,
            "class_name": child.class_name
        })

    return children

# Attendance

@router.get("/attendance")
def child_attendance(
    db: Session = Depends(get_db),
    current_parent: User = Depends(allow_parent)
):
    parent = db.query(Parent).filter(
        Parent.user_id == current_parent.id
    ).first()

    if not parent:
        raise HTTPException(
            status_code=404,
            detail="Parent not found"
        )

    result = []

    for child in parent.children:

        attendance = db.query(Attendance).filter(
            Attendance.student_id == child.id
        ).all()

        result.append({
            "student_id": child.id,
            "student_name": child.name,
            "attendance": attendance
        })

    return result

# Grades

@router.get("/grades")
def child_grades(
    db: Session = Depends(get_db),
    current_parent: User = Depends(allow_parent)
):
    parent = db.query(Parent).filter(
        Parent.user_id == current_parent.id
    ).first()

    if not parent:
        raise HTTPException(
            status_code=404,
            detail="Parent not found"
        )

    result = []

    for child in parent.children:

        grades = db.query(Grade).filter(
            Grade.student_id == child.id
        ).all()

        result.append({
            "student_id": child.id,
            "student_name": child.name,
            "grades": grades
        })

    return result

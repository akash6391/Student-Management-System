from fastapi import FastAPI
from app.models import (
    User,
    Student,
    Teacher,
    Parent,
    Subject,
    Attendance,
    Grade,
    parent_student_link,
)

from app.database import engine,Base
from app.routers.student import router as student_router
from app.routers.auth import router as auth_router
from app.routers.teacher import router as teacher_router
from app.routers.parent import router as parent_router
from app.routers.admin import router as admin_router
from app.routers.attendance import router as attendance_router
from fastapi.middleware.cors import CORSMiddleware






app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message":"student management system is running"}
# including the auth routes
app.include_router(auth_router,prefix="/auth",tags=["Authentication"])

# include the student router
app.include_router(student_router, prefix="/students", tags=["Students"])

# include the parent route
app.include_router(parent_router,prefix="/parent", tags=["Parent Dashboard"])

# include the teacher route
app.include_router(teacher_router,prefix="/teacher",tags=["Teacher Dashboard"])

# include admin route
app.include_router(admin_router,prefix="/admin",tags=["Admin Dashboard"])

# include attendance route
app.include_router(attendance_router,prefix="/attendance")
# 🎓 Student Management System

A full-stack Student Management System built with **FastAPI**, **React**, and **PostgreSQL**. The application provides secure authentication and role-based access control for Admin, Teacher, Student, and Parent users.

## 🚀 Features

### Authentication
- JWT Authentication
- Secure Login
- Password Hashing
- Role-Based Access Control (RBAC)
- Automatic email sent to parent if student is absent

### Admin
- Manage Students
- Manage Teachers
- Manage Parents
- Manage Subjects
- Assign Students to Parents
- View Attendance

### Teacher
- View Assigned Subjects
- Mark Student Attendance
- Upload Student Grades

### Student
- View Attendance
- View Dashboard

### Parent
- View Children Details
- View Attendance
- View Grades

---

## 🛠 Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT Authentication
- Passlib (Password Hashing)

### Frontend
- React
- React Router
- Axios
- Bootstrap
- Vite

---

## 📂 Project Structure

```
student_management_system/
│
├── app/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── utils/
│   ├── dependencies/
│   ├── database.py
│   └── main.py
│
├── frontend/
│   └── student-management-frontend/
│
└── README.md
```

---

## 🔑 User Roles

- Admin
- Teacher
- Student
- Parent

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### Backend Setup

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

---

### Frontend Setup

```bash
cd frontend/student-management-frontend
npm install
npm run dev
```

---

## 📡 API Documentation

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

## 📸 Screenshots

Login
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/76f76d2f-0dad-4f82-b580-a6ca5ec6a2cc" />

# Admin Dashboard
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/4a3ab169-8780-4556-9cde-b6178e281861" />

# Manage Users
Student
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c4739ec9-aec5-4dbb-99e7-edf51516b067" />

Teacher
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/650816c0-ea45-48b6-b1b6-c7759163df31" />

Parent
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/79a63bee-6372-406d-a732-5e716461c330" />

# Subject
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e5ec1eba-8394-44fb-a3a0-f888d00b53ba" />


# Teacher Dashboard
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c8a4a11d-395b-4e27-a8bb-67e0a2e0b2b1" />

Mark Attendance
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/fad7a17d-a977-4fb4-ab73-fd8af1cae536" />

Upload Grades
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/00c5a6f2-4b36-467f-b17a-0b74921e1166" />

My Subjects
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/54bd2061-e6a8-41be-9808-42ac8d6261af" />

# Student Dashboard
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/e0a3bf2f-3d80-4fe5-a865-90af0f2da941" />

# Parent Dashboard
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/7d81b3d1-8a15-4685-b59d-ac75a4387ff8" />

My Children
<img width="1916" height="1079" alt="image" src="https://github.com/user-attachments/assets/1ba38577-019f-46c4-b3a3-4c51a0049e34" />

Children Attendance
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/7f6d4e36-ed11-42bf-9417-49423c78d687" />

Children Grades
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/d0c9c5a7-4dae-4ac0-9b3e-177bd1257c1a" />

---

## 📌 Future Improvements

- Edit/Delete Features
- Email Verification
- Password Reset
- Profile Images
- Notifications
- Dashboard Analytics

---

## 👨‍💻 Author

**Akash Yadav**

GitHub: https://github.com/akash6391

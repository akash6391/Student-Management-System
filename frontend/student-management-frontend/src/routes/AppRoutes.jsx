import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "../pages/Login";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import Attendance from "../pages/admin/Attendance";

// parent page
import ParentDashboard from "../pages/parent/Dashboard";
import ParentAttendance from "../pages/parent/Attendance";
import ParentGrades from "../pages/parent/Grades";
import MyChildren from "../pages/parent/MyChildren";
// Student Pages
import StudentDashboard from "../pages/student/Dashboard";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherAttendance from "../pages/teacher/Attendance";
import TeacherGrades from "../pages/teacher/Grades";
import TeacherSubjects from "../pages/teacher/Subjects";

// Components
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/layouts/AdminLayout";

// Subjects
import Subjects from "../pages/admin/Subjects";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="manage-users"
            element={<ManageUsers />}
          />

          <Route
            path="attendance"
            element={<Attendance />}
          />
          <Route
           path="subjects"
           element={<Subjects />}
          />
        </Route>

        {/* ================= STUDENT ROUTES ================= */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        {/* Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <ProtectedRoute>
              <TeacherAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/grades"
          element={
            <ProtectedRoute>
              <TeacherGrades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/subjects"
          element={
            <ProtectedRoute>
              <TeacherSubjects />
            </ProtectedRoute>
          }
        />

        {/* Parent Routes */}
        <Route
          path="/Parent/dashboard"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/my-children"
          element={
            <ProtectedRoute>
              <MyChildren />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Parent/attendance"
          element={
            <ProtectedRoute>
              <ParentAttendance/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Parent/grades"
          element={
            <ProtectedRoute>
              <ParentGrades />
            </ProtectedRoute>
          }
        />

      </Routes>
      
    </BrowserRouter>
  );
}

export default AppRoutes;
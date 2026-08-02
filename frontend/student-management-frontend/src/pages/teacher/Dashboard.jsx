import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherDashboard } from "../../api/teacherapi";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getTeacherDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="container mt-5 text-center">
        <h3>No Dashboard Data</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-2">
        Welcome, {dashboard.teacher_name}
      </h2>

      <p className="text-muted">
        Employee ID : {dashboard.employee_id}
      </p>

      <p className="text-muted mb-4">
        Department : {dashboard.department}
      </p>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h5>Total Subjects</h5>
              <h2>{dashboard.subjects}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h5>Attendance Marked</h5>
              <h2>{dashboard.attendance_marked}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h5>Grades Uploaded</h5>
              <h2>{dashboard.grades_uploaded}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">

        <h4 className="mb-3">
          Quick Actions
        </h4>

        <div className="d-flex gap-3 flex-wrap">

          <button
            className="btn btn-primary"
            onClick={() => navigate("/teacher/attendance")}
          >
            Mark Attendance
          </button>

          <button
            className="btn btn-success"
            onClick={() => navigate("/teacher/grades")}
          >
            Upload Grades
          </button>

          <button
            className="btn btn-info text-white"
            onClick={() => navigate("/teacher/subjects")}
          >
            My Subjects
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
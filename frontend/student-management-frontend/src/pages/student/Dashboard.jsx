import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/studentapi";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getStudentDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
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

  return (
    <div className="container mt-4">

      <h2 className="mb-2">
        Welcome, {dashboard.student_name}
      </h2>

      <p className="text-muted mb-4">
        Class : {dashboard.class}
      </p>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Attendance</h5>
              <h2>{dashboard.attendance_percentage}%</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Subjects</h5>
              <h2>{dashboard.subjects}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Obtained Marks</h5>
              <h2>{dashboard.obtained_marks}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Maximum Marks</h5>
              <h2>{dashboard.maximum_marks}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Overall Percentage</h5>
              <h2>{dashboard.overall_percentage}%</h2>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
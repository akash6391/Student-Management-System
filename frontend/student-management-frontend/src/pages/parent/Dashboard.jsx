import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getParentDashboard } from "../../api/parentapi";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getParentDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    }
  };

  if (!dashboard) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* Welcome */}
      <h1 className="mb-4">
        Welcome, {dashboard.name}
      </h1>

      {/* Parent Details */}
      <div className="mb-4">
        <p>
          <strong>Email :</strong> {dashboard.email}
        </p>

        <p>
          <strong>Father Name :</strong> {dashboard.father_name}
        </p>

        <p>
          <strong>Mother Name :</strong> {dashboard.mother_name}
        </p>

        <p>
          <strong>Phone :</strong> {dashboard.phone}
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h4>Total Children</h4>
              <h1>{dashboard.total_children}</h1>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}

      <h3 className="mt-5 mb-3">
        Quick Actions
      </h3>

      <div className="d-flex flex-wrap gap-3">

        <Link
          to="/parent/my-children"
          className="btn btn-primary"
        >
          My Children
        </Link>

        <Link
          to="/parent/attendance"
          className="btn btn-success"
        >
          Attendance
        </Link>

        <Link
          to="/parent/grades"
          className="btn btn-info text-white"
        >
          Grades
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;
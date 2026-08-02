import { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
import { getDashboard } from "../../api/adminApi";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    subjects: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h1 className="mb-4">Admin Dashboard</h1>

      <div className="row">

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Total Students"
            value={stats.students}
            color="primary"
          />
        </div>

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Total Teachers"
            value={stats.teachers}
            color="success"
          />
        </div>

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Total Parents"
            value={stats.parents}
            color="warning"
          />
        </div>

        <div className="col-md-3 mb-4">
          <DashboardCard
            title="Total Subjects"
            value={stats.subjects}
            color="danger"
          />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
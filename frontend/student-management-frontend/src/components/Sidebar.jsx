import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "220px",
        minHeight: "100vh",
      }}
    >
      <h4>Admin</h4>

      <hr />

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/admin/manage-users"
          >
            Manage Users
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/admin/attendance"
          >
            Attendance
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/subjects">
                 Subjects
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
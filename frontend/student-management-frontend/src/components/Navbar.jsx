import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4">

      <span className="navbar-brand">
        Student Management System
      </span>

      <div className="d-flex align-items-center">

        <span className="text-white me-3">
          {role}
        </span>

        <button
          className="btn btn-light btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
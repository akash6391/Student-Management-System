import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default AdminLayout;
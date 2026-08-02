import { useEffect, useState } from "react";
// student
import { getStudents } from "../../api/studentapi";
import StudentTable from "./StudentTable";
import AddStudent from "./AddStudent";
// teacher
import { getTeachers } from "../../api/teacherapi";
import TeacherTable from "./TeacherTable";
import AddTeacher from "./AddTeacher";
// parent
import { getParents } from "../../api/parentapi";
import ParentTable from "./ParentTable";
import AddParent from "./AddParent";

function ManageUsers() {
  const [activeTab, setActiveTab] = useState("students");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  const [parents, setParents] = useState([]);
  const [loadingParents, setLoadingParents] = useState(true);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchParents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };
  const fetchTeachers = async () => {
  try {
    const data = await getTeachers();
    setTeachers(data);
  } catch (error) {
    console.error(error);
    alert("Failed to load teachers");
  } finally {
    setLoadingTeachers(false);
  }
};
const fetchParents = async () => {
  try {
    const data = await getParents();
    setParents(data);
  } catch (error) {
    console.error(error);
    alert("Failed to load Parents");
  } finally {
    setLoadingParents(false);
  }
};

  return (
    <div className="container-fluid">

      <h2 className="mb-4">Manage Users</h2>

      {/* Tabs */}

      <div className="mb-4">

        <button
          className={`btn me-2 ${
            activeTab === "students"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
        
        <button
          className={`btn me-2 ${
            activeTab === "teachers"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          Teachers
        </button>

        <button
          className={`btn ${
            activeTab === "parents"
              ? "btn-warning"
              : "btn-outline-warning"
          }`}
          onClick={() => setActiveTab("parents")}
        >
          Parents
        </button>

      </div>

      {/* Students */}

      {activeTab === "students" && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4>Students</h4>

            <AddStudent fetchStudents={fetchStudents} />

          </div>

          <StudentTable
            students={students}
            loading={loading}
          />
        </>
      )}

      {/* Teachers */}

      {activeTab === "teachers" && (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>Teachers</h4>

      <AddTeacher fetchTeachers={fetchTeachers} />
    </div>

    <TeacherTable
      teachers={teachers}
      loading={loadingTeachers}
    />
  </>
)}

      {/* Parents */}

     {activeTab === "parents" && (
  <>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>Parents</h4>

      <AddParent fetchParents={fetchParents} />
    </div>

    <ParentTable
      parents={parents}
      loading={loadingParents}
    />
  </>
)}

    </div>
  );
}

export default ManageUsers;
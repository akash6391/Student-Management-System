import { useEffect, useState } from "react";
import { getSubjects } from "../../api/adminApi";
import AddSubjectModal from "./AddSubjectModal";

function Subjects() {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Subjects</h2>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addSubjectModal"
        >
          Add Subject
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.teacher_name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No Subjects Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <AddSubjectModal onSuccess={fetchSubjects} />
    </div>
  );
}

export default Subjects;
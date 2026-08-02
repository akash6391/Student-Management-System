import { useEffect, useState } from "react";
import { getTeacherSubjects } from "../../api/teacherapi";

function TeacherSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = async () => {
    try {
      const data = await getTeacherSubjects();
      setSubjects(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Subjects</h2>

      {loading ? (
        <p>Loading...</p>
      ) : subjects.length === 0 ? (
        <p>No subjects assigned.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Subject Name</th>
              <th>Class</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.class_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeacherSubjects;
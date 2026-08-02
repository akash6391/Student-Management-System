import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentapi";
import { markAttendance } from "../../api/teacherapi";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    let successCount = 0;
    let errorCount = 0;

    for (const student of students) {
      if (!attendance[student.id]) continue;

      try {
        const response = await markAttendance({
          student_id: student.id,
          date,
          status: attendance[student.id],
        });

        console.log("Success:", response);
        successCount++;

      } catch (err) {
        console.error(err);

        errorCount++;

        console.log(
          `Student ${student.id}:`,
          err.response?.data?.detail
        );
      }
    }

    if (successCount > 0) {
      alert(`Attendance marked successfully for ${successCount} student(s).`);

      // Clear selections
      setAttendance({});

      // Optional: reload students
      fetchStudents();

    } else if (errorCount > 0) {
      alert("Attendance could not be saved.");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Mark Attendance</h2>

      <div className="mb-3">
        <label>Date</label>

        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student.id}>

              <td>{student.id}</td>

              <td>{student.name}</td>

              <td>{student.class_name}</td>

              <td>

                <select
                  className="form-select"
                  value={attendance[student.id] || ""}
                  onChange={(e) =>
                    handleStatus(student.id, e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <button
        className="btn btn-success"
        onClick={handleSubmit}
      >
        Save Attendance
      </button>

    </div>
  );
}

export default Attendance;
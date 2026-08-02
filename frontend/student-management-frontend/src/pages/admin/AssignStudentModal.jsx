import { useEffect, useState } from "react";
import { getStudents } from "../../api/studentapi";
import { assignStudent } from "../../api/parentapi";

function AssignStudentModal({ parentId, onClose }) {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load students");
    }
  };

  const handleAssign = async () => {
    if (!studentId) {
      alert("Please select a student");
      return;
    }

    try {
      await assignStudent({
        parent_id: parentId,
        student_id: Number(studentId),
      });

      alert("Student assigned successfully");
      onClose();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Assignment failed");
    }
  };

  return (
    <>
      {/* Background */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0,0,0,0.5)",
          zIndex: 1040,
        }}
      ></div>

      {/* Modal */}
      <div
        className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow"
        style={{
          width: "420px",
          zIndex: 1050,
        }}
      >
        <h4 className="mb-3">Assign Student</h4>

        <div className="mb-3">
          <label className="form-label">
            Select Student
          </label>

          <select
            className="form-select"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">
              -- Select Student --
            </option>

            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.name} (Roll: {student.roll_number})
              </option>
            ))}
          </select>
        </div>

        <div className="text-end">
          <button
            className="btn btn-secondary me-2"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </>
  );
}

export default AssignStudentModal;
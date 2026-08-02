import { useEffect, useState } from "react";
import {
  getTeacherStudents,
  getTeacherSubjects,
  uploadGrade,
} from "../../api/teacherapi";

function Grades() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    student_id: "",
    subject_id: "",
    exam_type: "",
    marks_obtained: "",
    total_marks: "",
    remarks: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsData = await getTeacherStudents();
      const subjectsData = await getTeacherSubjects();

      console.log("Students:", studentsData);
      console.log("Subjects:", subjectsData);

      setStudents(studentsData);
      setSubjects(subjectsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadGrade({
        ...formData,
        student_id: Number(formData.student_id),
        subject_id: Number(formData.subject_id),
        marks_obtained: Number(formData.marks_obtained),
        total_marks: Number(formData.total_marks),
      });

      alert("Grade Uploaded Successfully");

      setFormData({
        student_id: "",
        subject_id: "",
        exam_type: "",
        marks_obtained: "",
        total_marks: "",
        remarks: "",
      });

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      }
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Upload Grades</h2>

      <form onSubmit={handleSubmit}>

        {/* Student */}
        <div className="mb-3">
          <label className="form-label">Student</label>

          <select
            className="form-select"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label className="form-label">Subject</label>

          <select
            className="form-select"
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} ({subject.class_name})
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type */}
        <div className="mb-3">
          <label className="form-label">Exam Type</label>

          <input
            type="text"
            className="form-control"
            name="exam_type"
            value={formData.exam_type}
            onChange={handleChange}
            placeholder="Mid Term"
            required
          />
        </div>

        {/* Obtained Marks */}
        <div className="mb-3">
          <label className="form-label">Obtained Marks</label>

          <input
            type="number"
            className="form-control"
            name="marks_obtained"
            value={formData.marks_obtained}
            onChange={handleChange}
            required
          />
        </div>

        {/* Total Marks */}
        <div className="mb-3">
          <label className="form-label">Total Marks</label>

          <input
            type="number"
            className="form-control"
            name="total_marks"
            value={formData.total_marks}
            onChange={handleChange}
            required
          />
        </div>

        {/* Remarks */}
        <div className="mb-3">
          <label className="form-label">Remarks</label>

          <textarea
            className="form-control"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success">
          Upload Grade
        </button>

      </form>
    </div>
  );
}

export default Grades;
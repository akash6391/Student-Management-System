import { useEffect, useState } from "react";
import { addSubject } from "../../api/adminapi";
import { getTeachers } from "../../api/teacherapi";

function AddSubjectModal({ onSuccess }) {
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    teacher_id: "",
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
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

  const handleSubmit = async () => {
    try {
      await addSubject(formData);

      alert("Subject Added Successfully");

      setFormData({
        name: "",
        teacher_id: "",
      });

      onSuccess();

      document.getElementById("closeModal").click();

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div
      className="modal fade"
      id="addSubjectModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">
            <h5>Add Subject</h5>

            <button
              id="closeModal"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-3"
              placeholder="Subject Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <select
              className="form-select"
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleChange}
            >
              <option value="">Select Teacher</option>

              {teachers.map((teacher) => (
                <option
                  key={teacher.id}
                  value={teacher.id}
                >
                  {teacher.name}
                </option>
              ))}

            </select>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AddSubjectModal;
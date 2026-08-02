import { useState } from "react";
import { addTeacher } from "../../api/teacherapi";

function AddTeacher({ fetchTeachers }) {

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employee_id: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await addTeacher(formData);

      alert("Teacher Added Successfully");

      setShowForm(false);

      setFormData({
        name: "",
        email: "",
        password: "",
        employee_id: "",
        department: "",
      });

      fetchTeachers();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to add teacher");
    }
  };

  return (
    <>

      <button
        className="btn btn-success"
        onClick={() => setShowForm(true)}
      >
        Add Teacher
      </button>

      {showForm && (

        <div className="card p-3 shadow mt-3 mb-3">

          <h4>Add Teacher</h4>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-2"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="employee_id"
              placeholder="Employee ID"
              value={formData.employee_id}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </form>

        </div>

      )}

    </>
  );
}

export default AddTeacher;
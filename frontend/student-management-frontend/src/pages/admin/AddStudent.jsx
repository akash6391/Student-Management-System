import { useState } from "react";
import { addStudent } from "../../api/studentapi";

function AddStudent({ fetchStudents }) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roll_number: "",
    age: "",
    contact_number: "",
    class_name: "",
    address: "",
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
      await addStudent(formData);

      alert("Student Added Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        roll_number: "",
        age: "",
        contact_number: "",
        class_name: "",
        address: "",
      });

      setShowForm(false);

      fetchStudents();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to add student");
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
      >
        Add Student
      </button>

      {showForm && (
        <div className="card p-3 mt-3 mb-3 shadow">

          <h4 className="mb-3">Add Student</h4>

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
              type="number"
              name="roll_number"
              placeholder="Roll Number"
              value={formData.roll_number}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="class_name"
              placeholder="Class"
              value={formData.class_name}
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              name="address"
              placeholder="Address"
              value={formData.address}
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

export default AddStudent;
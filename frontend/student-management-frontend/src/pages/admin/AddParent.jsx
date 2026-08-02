import { useState } from "react";
import { addParent } from "../../api/parentapi";

function AddParent({ fetchParents }) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    father_name: "",
    mother_name: "",
    phone: "",
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
      await addParent(formData);

      alert("Parent Added Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        father_name: "",
        mother_name: "",
        phone: "",
      });

      setShowForm(false);

      fetchParents();

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Failed to add parent");
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowForm(true)}
      >
        Add Parent
      </button>

      {showForm && (
        <div className="card p-3 mt-3 mb-3 shadow">

          <h4 className="mb-3">Add Parent</h4>

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
              name="father_name"
              placeholder="Father Name"
              value={formData.father_name}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-2"
              name="mother_name"
              placeholder="Mother Name"
              value={formData.mother_name}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
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

export default AddParent;
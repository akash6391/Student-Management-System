import { useState } from "react";
import AssignStudentModal from "./AssignStudentModal";

function ParentTable({ parents, loading }) {
  const [selectedParent, setSelectedParent] = useState(null);

  return (
    <>
      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (

            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>

          ) : parents.length > 0 ? (

            parents.map((parent) => (
              <tr key={parent.id}>

                <td>{parent.id}</td>
                <td>{parent.name}</td>
                <td>{parent.email}</td>
                <td>{parent.father_name}</td>
                <td>{parent.mother_name}</td>
                <td>{parent.phone}</td>

                <td>
                  {/* <button
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button> */}
                  {/* <button
                    className="btn btn-danger btn-sm me-2"
                  >
                    Delete
                  </button> */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setSelectedParent(parent.id)}
                  >
                    Assign Student
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Parents Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedParent && (
        <AssignStudentModal
          parentId={selectedParent}
          onClose={() => setSelectedParent(null)}
        />
      )}

    </>
  );
}
export default ParentTable;
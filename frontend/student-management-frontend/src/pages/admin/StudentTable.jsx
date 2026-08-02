function StudentTable({ students, loading }) {
  return (
    <table className="table table-bordered table-hover">

      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Roll No.</th>
          <th>Class</th>
          <th>Age</th>
          <th>Contact</th>
          <th>Address</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>

      <tbody>

        {loading ? (

          <tr>
            <td colSpan="8" className="text-center">
              Loading...
            </td>
          </tr>

        ) : students.length > 0 ? (

          students.map((student) => (
            <tr key={student.id}>

              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.roll_number}</td>
              <td>{student.class_name}</td>
              <td>{student.age}</td>
              <td>{student.contact_number}</td>
              <td>{student.address}</td>

              {/* <td>

                <button className="btn btn-warning btn-sm me-2">
                  Edit
                </button>

                <button className="btn btn-danger btn-sm">
                  Delete
                </button>

              </td> */}

            </tr>
          ))

        ) : (

          <tr>
            <td colSpan="8" className="text-center">
              No Students Found
            </td>
          </tr>

        )}

      </tbody>

    </table>
  );
}

export default StudentTable;
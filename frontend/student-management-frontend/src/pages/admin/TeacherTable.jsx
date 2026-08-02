function TeacherTable({ teachers, loading }) {
  return (
    <table className="table table-bordered table-hover">

      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Employee ID</th>
          <th>Department</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>

      <tbody>

        {loading ? (

          <tr>
            <td colSpan="5" className="text-center">
              Loading...
            </td>
          </tr>

        ) : teachers.length > 0 ? (

          teachers.map((teacher) => (
            <tr key={teacher.id}>

              <td>{teacher.id}</td>

              <td>{teacher.name}</td>

              <td>{teacher.employee_id}</td>

              <td>{teacher.department}</td>

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
            <td colSpan="5" className="text-center">
              No Teachers Found
            </td>
          </tr>
        )}
      </tbody>

    </table>
  );
}
export default TeacherTable;
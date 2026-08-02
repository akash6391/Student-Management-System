import { useEffect, useState } from "react";
import { getParentAttendance } from "../../api/parentapi";

function Attendance() {

    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const data = await getParentAttendance();
            setAttendance(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">

            <h2>Children Attendance</h2>

            {attendance.map((student) => (

                <div key={student.student_id} className="mb-4">

                    <h4>{student.student_name}</h4>

                    <table className="table table-bordered">

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {student.attendance.map((record) => (

                                <tr key={record.id}>

                                    <td>{record.date}</td>

                                    <td>{record.status}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            ))}

        </div>
    );
}

export default Attendance;
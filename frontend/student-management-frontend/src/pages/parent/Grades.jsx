import { useEffect, useState } from "react";
import { getParentGrades } from "../../api/parentapi";

function Grades() {
    console.log("Grades component rendered");

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const data = await getParentGrades();
            console.log("Response:", data);
            setGrades(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Children Grades</h2>
            {grades.map((student) => (
                <div key={student.student_id} className="mb-4">
                    <h4>{student.student_name}</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Obtained</th>
                                <th>Total</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.grades.map((grade) => (
                                <tr key={grade.id}>
                                    <td>{grade.exam_type}</td>
                                    <td>{grade.marks_obtained}</td>
                                    <td>{grade.total_marks}</td>
                                    <td>{grade.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Grades;
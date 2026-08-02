import { useEffect, useState } from "react";
import { getMyChildren } from "../../api/parentapi";

function MyChildren() {

    const [children, setChildren] = useState([]);

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const data = await getMyChildren();
            setChildren(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4">

            <h2>My Children</h2>

            <table className="table table-bordered mt-3">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                    </tr>

                </thead>

                <tbody>

                    {children.map((child) => (

                        <tr key={child.student_id}>

                            <td>{child.student_id}</td>

                            <td>{child.name}</td>

                            <td>{child.class_name}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default MyChildren;
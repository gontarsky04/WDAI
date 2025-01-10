import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface student {
    firstName: string;
    lastName: string;
    year: number | null;
}

function StudentManager() {
    const [students, setStudents] = useState<student[]>([
        { firstName: "Michał", lastName: "Gontarz", year: 2020 },
        { firstName: "Jan", lastName: "Kowalski", year: 2003 },
    ]);

    const addStudent = (formData: student) => {
        console.log("tak");
        setStudents((prevData) => [...prevData, formData]);
    };

    return (
        <>
            <table>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Rocznik</th>
                </tr>
                {students.map((student) => (
                    <tr>
                        <th>{student.firstName}</th>
                        <th>{student.lastName}</th>
                        <th>{student.year}</th>
                    </tr>
                ))}
            </table>
            <Dodawanie addDataFunction={addStudent}></Dodawanie>
        </>
    );
}

export default StudentManager;
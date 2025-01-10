function Studenci() {
    interface student {
        firstName: string;
        lastName: string;
        year: number;
    }

    const students: student[] = [
        { firstName: "Michał", lastName: "Gontarz", year: 2023 },
        { firstName: "Jan", lastName: "Kowalski", year: 2005 },
    ];

    return (
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
    );
}

export default Studenci;
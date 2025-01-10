import { useState } from "react";

interface student {
    firstName: string;
    lastName: string;
    year: number | null;
}

interface NewStudentProps {
    addDataFunction: (formData: student) => void;
}

function Dodawanie(prop: NewStudentProps) {
    const [formData, setFormData] = useState<student>({
        firstName: "",
        lastName: "",
        year: null,
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        prop.addDataFunction(formData);
        setFormData({
            firstName: "",
            lastName: "",
            year: null,
        });
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">Imię</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            ></input>
            <label htmlFor="lastName">Nazwisko</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            ></input>
            <label htmlFor="year">Rocznik</label>
            <input
                type="number"
                name="year"
                value={formData.year ?? ""}
                onChange={handleChange}
                min="0"
                required
            ></input>
            <button type="submit">Dodaj</button>
        </form>
    );
}

export default Dodawanie;
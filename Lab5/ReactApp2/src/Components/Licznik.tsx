import { useState, useEffect } from "react";

function Licznik() {
    const [counter, setCounter] = useState(() => {
        const savedCounter = localStorage.getItem("counter");
        return savedCounter ? Number(savedCounter) : 0; // Odczyt z localStorage lub domyślna wartość
    });
    useEffect(() => {
        localStorage.setItem("counter", String(counter));
    }, [counter]);

    return (
        <>
            <div>{counter}</div>
            <button type="button" onClick={() => setCounter(counter + 1)}>
                Dodaj
            </button>
        </>
    );
}

export default Licznik;

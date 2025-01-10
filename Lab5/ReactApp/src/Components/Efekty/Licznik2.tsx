import { useEffect, useState } from "react";

function Licznik2() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log("Licznik zwiększył się do: " + counter);
    }, [counter]);

    useEffect(() => {
        console.log("Hello World");
    }, []);

    return (
        <>
            <div>{counter}</div>
            <button type="button" onClick={() => setCounter(counter + 1)}>
                Dodaj
            </button>
        </>
    );
}

export default Licznik2;
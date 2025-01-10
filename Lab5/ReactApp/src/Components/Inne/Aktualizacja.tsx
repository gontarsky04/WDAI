import { useState } from "react";

function Aktualizacja() {
    const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });

    const updateState = () => {
        setProdukt((prevState) => ({ ...prevState, cena: 100 }));
    };

    return (
        <>
            <div>
                Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
            </div>
            <button onClick={updateState}>Zmień cenę</button>
        </>
    );
}

export default Aktualizacja;
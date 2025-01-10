import { useEffect, useState } from "react";

function Tytul() {
    const [title, setTitle] = useState("ReactApp");
    console.log(title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => {
                setTitle(event.target.value);
            }}
        ></input>
    );
}

export default Tytul;
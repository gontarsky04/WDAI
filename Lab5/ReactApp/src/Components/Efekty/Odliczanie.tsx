import { useEffect, useState } from "react";

function Odliczanie() {
    const [timer, setTimer] = useState<number>(15);
    const [buttonSignature, setButtonSignature] = useState<string>("Start");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const rotateButtonSignature = () => {
        if (buttonSignature == "Start") {
            setButtonSignature("Stop");
            return;
        }
        setButtonSignature("Start");
    };

    useEffect(() => {
        if (buttonSignature == "Start") {
            return;
        }
        if (timer <= 0.1) {
            setIsDisabled(true);
            setButtonSignature("Odliczanie zakończone");
            return;
        }
        let timerInterval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 0.1);
        }, 100);
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [buttonSignature, timer]);

    return (
        <>
            <div>{timer.toFixed(1)} sek</div>
            <button onClick={rotateButtonSignature} disabled={isDisabled}>
                {buttonSignature}
            </button>
        </>
    );
}

export default Odliczanie;
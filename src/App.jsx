import { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
    const [display, setDisplay] = useState("");

    const [error, setError] = useState();

    const [showAdvButtons, toggleAdvButton] = useState(false);

    const [historic, setHistoric] = useState([]);

    const [showHistory, toggleHistory] = useState(false);

    // create a controller to key press
    const regex = /^([0-9]|-|\+|\*|\/|\.)*$/;

    // create an array to buttons
    const keyboard = [
        "7",
        "8",
        "9",
        "/",
        "C",
        "4",
        "5",
        "6",
        "*",
        "Del",
        "1",
        "2",
        "3",
        "-",
        "Adv",
        "0",
        ".",
        "+",
        "=",
    ];

    const advButtons = ["(", ")", "Hist", "Up", "Ac"];

    const histRef = useRef();

    useEffect(()=>{
        if (historic.length > 4 && showHistory){
            histRef.current.scrollTop = histRef.current.scrollHeight;
        }
    },[historic.length, showHistory])

    useEffect(() => {
        if (error) {
            setError();
        }
    }, [display]);

    // encapsulating the equals function
    const equals = () => {
        try {
            const result = eval(display);

            setHistoric(
                [].concat(historic, {
                    calc: display,
                    result,
                })
            );
            setDisplay(`${result}`);
        } catch (e) {
            setError(e);
        }
    };

    // encapsulating the empty display function
    const toEmpty = () => {
        setDisplay("");
    };

    // function to handle each special button
    const handleClick = (button) => {
        switch (button) {
            case "=":
                equals();
                break;

            case "C":
                toEmpty();
                break;

            case "Del":
                setDisplay(display.substring(0, display.length - 1));
                break;

            case "Adv":
                toggleAdvButton(!showAdvButtons);
                toggleHistory(false);
                break;

            case "Hist":
                toggleHistory(!showHistory);
                break;

            case "Up":
                if (historic.length > 0 ) {
                    const lastIndex = historic.length - 1;
                    const newDisplay = historic[lastIndex].calc;
                    const newHistoric = historic.slice(0, lastIndex);
                    setDisplay(newDisplay);
                    setHistoric(newHistoric);
                }
                break;

            case "Ac":
                setDisplay("");
                setHistoric([]);
                break;

            default:
                setDisplay(`${display}${button}`);
        }
    };

    const buildButtons = (button) => {
        const span2Class = button === "0" ? "span2" : "";
        const primaryClass = isNaN(button) ? "primary" : "";
        return (
            <Button
                button={button}
                onClick={handleClick}
                key={button}
                className={`${span2Class} ${primaryClass}`}
            >
                {button}
            </Button>
        );
    };

    return (
        <div className="container">
            <header>
                <h1>Calculadora</h1>
                <p>Criada usando React</p>
            </header>

            <main>
                {showHistory && (
                    <div ref = {histRef} className="historic">
                        {historic.map(({ calc, result }, index) => (
                            <p key={index}>{`${calc} = ${result}`}</p>
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    value={display}
                    onChange={(event) => {
                        const { value } = event.target;

                        if (regex.test(value)) {
                            setDisplay(value);
                        }
                    }}
                    className="display"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            equals();
                        } else if (event.key === "Escape") {
                            toEmpty();
                        }
                    }}
                />

                {error && (
                    <p className="error">{`Invalid Expression: ${error}`}</p>
                )}

                {showAdvButtons && (
                    <div className="buttons">
                        {advButtons.map(buildButtons)}
                    </div>
                )}

                <div className="buttons">{keyboard.map(buildButtons)}</div>
            </main>

            <footer>Feita por Lorrane</footer>
        </div>
    );
}

export default App;

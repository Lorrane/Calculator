import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
    const [display, setDisplay] = useState("");

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
        "Ins",
        "0",
        ".",
        "+",
        "=",
    ];

    const handleClick = (button) => {
        switch (button) {
            case "=":
                setDisplay(eval(display));
                break;

            case "C":
                setDisplay("");
                break;

            case "Del":
                setDisplay(display.substring(0, display.length - 1));
                break;

            default:
                setDisplay(`${display}${button}`);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Calculadora</h1>
                <p>Criada usando React</p>
            </header>

            <main>
                {/* aqui ficará todo o código da calculadora */}
                <input 
                    type="text" 
                    value={display} 
                    onChange = {(event) => {
                      setDisplay(event.target.value)
                    }}
                    className="display" 
                />
                <div className="buttons">
                    {keyboard.map((button) => {
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
                    })}
                </div>
            </main>

            <footer>Feita por Lorrane</footer>
        </div>
    );
}

export default App;

import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {

  const [display, setDisplay] = useState("");
  
  const keyboard = [
    "7", "8", "9", "/", "C",
    "4", "5", "6", "*", "Del",
    "1", "2", "3", "-", "Ins",
    "0", ".", "+", "="
  ];

  const handleClick = (button) => {
     if (button === "="){
      setDisplay(eval(display));
    } else {
      setDisplay(`${display}${button}`)
    }
    }
  

  return (
    <div className="container">
      <header>
        <h1>Calculadora</h1>
        <p>Criada usando React</p>
      </header>


      <main>
        {/* aqui ficará todo o código da calculadora */}
        <input type="text" value={display} className="display" />
        <div className="buttons">
          {keyboard.map(button  => (
            <Button button={button} onClick={handleClick} key={button} className={button === "0" && "span2"}>{button}</Button>
          ))}
        </div>
      </main>

      <footer>Feita por Lorrane</footer>
    </div>
  );
}

export default App;

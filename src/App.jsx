import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const nextColor = buttonColor === "red" ? "blue" : "red";
  const [buttonState, setButtonState] = useState(false);

  return (
    <div>
      <button
        className={buttonState === false ? buttonColor : "grey"}
        onClick={() => setButtonColor(nextColor)}
        disabled={buttonState}
      >
        Change to {nextColor}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={() => setButtonState(!buttonState)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
}

export default App;

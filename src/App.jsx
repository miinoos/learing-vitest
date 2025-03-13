import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const nextColor = buttonColor === "red" ? "blue" : "red";
  const [buttonState, setButtonState] = useState(false);

  return (
    <div>
      <button
        className={buttonColor}
        onClick={() => setButtonColor(nextColor)}
        disabled={buttonState}
      >
        Change to blue
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

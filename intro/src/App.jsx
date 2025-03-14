import "./App.css";
import { useState } from "react";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  let nextColor =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const [buttonState, setButtonState] = useState(false);

  return (
    <div>
      <button
        className={buttonState === false ? buttonColor : "grey"}
        onClick={() => setButtonColor(nextColor)}
        disabled={buttonState}
      >
        Change to {kebabCaseToTitleCase(nextColor)}
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

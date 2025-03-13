// import { logRoles } from "@testing-library/dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button starts with correct label and the correct color", () => {
  render(<App />);
  // const { container } = render(<App />);
  // logRoles(container); //for checking roles of a container
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red");
});

test("button starts with correct label and the correct color after click", () => {
  render(<App />); //render the page
  const buttonElement = screen.getByRole("button", { name: /blue/i }); //find the button
  expect(buttonElement).toHaveClass("red"); //check initial class
  fireEvent.click(buttonElement); //click the button with fireEvent
  expect(buttonElement).toHaveTextContent(/blue/i);
  expect(buttonElement).toHaveClass("blue"); //styles are difficult to test via vitest so taking class into consideration
});

// test("button starts with the correct text after click", () => {});

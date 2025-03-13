// import { logRoles } from "@testing-library/dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";

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

test("checkbox intial checks", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});

test("checkbox intial checks", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(checkboxElement).toBeChecked();
  fireEvent.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeEnabled();
});

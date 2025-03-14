// import { logRoles } from "@testing-library/dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";
import { kebabCaseToTitleCase } from "./helpers";

// test("button starts with correct label and the correct color", () => {
//   render(<App />);
//   // const { container } = render(<App />);
//   // logRoles(container); //for checking roles of a container
//   const buttonElement = screen.getByRole("button", { name: /blue/i });
//   expect(buttonElement).toHaveClass("red");
// });

// test("button starts with correct label and the correct color after click", () => {
//   render(<App />); //render the page
//   const buttonElement = screen.getByRole("button", { name: /blue/i }); //find the button
//   expect(buttonElement).toHaveClass("red"); //check initial class
//   fireEvent.click(buttonElement); //click the button with fireEvent
//   expect(buttonElement).toHaveTextContent(/red/i);
//   expect(buttonElement).toHaveClass("blue"); //styles are difficult to test via vitest so taking class into consideration
// });

//Deprecating above test cases as new test is implemented for classes with Upper Case

test("checkbox intial checks", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});

test("checkbox disables button", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(checkboxElement).toBeChecked();
  expect(buttonElement).toHaveClass("grey");
  fireEvent.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).not.toHaveClass("grey");
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red"); //expecting output for a function
  });
  test("works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});

//implementing test cases for upper case classNames

test("Check if the flow is working correctly for the new class names", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: /change to midnight blue/i,
  });
  const checkElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  expect(buttonElement).toHaveClass("medium-violet-red");
  expect(checkElement).not.toBeChecked();
  expect(checkElement).toBeEnabled();
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveClass("midnight-blue");
  expect(buttonElement).toHaveTextContent(/change to medium violet red/i);
  fireEvent.click(checkElement);
  expect(checkElement).toBeChecked();
  expect(buttonElement).toHaveClass("grey");
  expect(buttonElement).toBeDisabled();
  fireEvent.click(checkElement);
  expect(buttonElement).toBeEnabled();
  expect(checkElement).not.toBeChecked();
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveClass("medium-violet-red");
});

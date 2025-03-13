import { render, screen } from "@testing-library/react";
import App from "./App";

test("button starts with the correct color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red");
});

test("button starts with the correct color after click", () => {});

test("button starts with the correct text after click", () => {});

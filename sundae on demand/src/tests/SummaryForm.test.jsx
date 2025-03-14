import { render, screen, fireEvent } from "@testing-library/react";
import "../pages/SummaryForm.jsx";
import SummaryForm from "../pages/SummaryForm.jsx";

test("TC01 : Check wether the confirm order button is disabled by default", () => {
  render(<SummaryForm />);
  const termsAndConditionCheckboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButtonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(termsAndConditionCheckboxElement).not.toBeChecked();
  expect(confirmOrderButtonElement).toBeDisabled();
});

test("TC02 : Check wether the confirm order button is enabled after checking terms and condition check mark", () => {
  render(<SummaryForm />);
  const termsAndConditionCheckboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButtonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  fireEvent.click(termsAndConditionCheckboxElement);
  expect(termsAndConditionCheckboxElement).toBeChecked();
  expect(confirmOrderButtonElement).toBeEnabled();
  fireEvent.click(termsAndConditionCheckboxElement);
  expect(termsAndConditionCheckboxElement).not.toBeChecked();
  expect(confirmOrderButtonElement).toBeDisabled();
});

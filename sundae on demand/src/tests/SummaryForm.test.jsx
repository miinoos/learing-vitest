import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("TC02 : Check wether the confirm order button is enabled after checking terms and condition check mark : Using fireEvent", () => {
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

test("TC03 : Check wether the confirm order button is enabled after checking terms and condition check mark : Using userEvent", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const termsAndConditionCheckboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButtonElement = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(termsAndConditionCheckboxElement);
  expect(termsAndConditionCheckboxElement).toBeChecked();
  expect(confirmOrderButtonElement).toBeEnabled();
  await user.click(termsAndConditionCheckboxElement);
  expect(termsAndConditionCheckboxElement).not.toBeChecked();
  expect(confirmOrderButtonElement).toBeDisabled();
});

test("TC04 : popover responds to hover - negative test", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no icecream will actually be delivered/i
  );
  expect(nullPopover).toBeNull(); //popover is not displayed when the initial page is loaded
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions); //hover over
  const popover = screen.getByText(/no icecream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  await user.unhover(termsAndConditions); //unhover over
  expect(popover).not.toBeInTheDocument();
});

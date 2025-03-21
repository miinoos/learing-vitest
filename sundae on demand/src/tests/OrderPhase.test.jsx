import { findAllByAltText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);
  const scoopTotal = screen.getByText("Scoops total : $", { exact: false });
  expect(scoopTotal).toHaveTextContent("0.00");
  const scoopImages = await screen.findAllByRole("img", { name: /scoop/i });
  expect(scoopImages).toHaveLength(2);
  const toppingTotal = screen.getByText("Toppings total : $", { exact: false });
  expect(toppingTotal).toHaveTextContent("0.00");
  const toppingImages = await screen.findAllByRole("img", { name: /topping/i });
  expect(toppingImages).toHaveLength(3);
  const grandTotal = screen.getByText("Grand total : $", { exact: false });
  expect(grandTotal).toHaveTextContent("0.00");
  const createOrderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  expect(createOrderButton).toBeDisabled();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopTotal).toHaveTextContent("2.00");
  expect(createOrderButton).toBeEnabled();
  expect(grandTotal).toHaveTextContent("2.00");
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesInput);
  expect(toppingTotal).toHaveTextContent("1.50");
  expect(grandTotal).toHaveTextContent("3.50");
  await user.click(createOrderButton);
  const termsAndConditionCheckboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(termsAndConditionCheckboxElement).not.toBeChecked();
  const nullPopover = screen.queryByText(
    /no icecream will actually be delivered/i
  );
  expect(nullPopover).toBeNull();
  const termsAndCondition = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndCondition);
  const popover = screen.getByText(/no icecream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  const confirmOrderButtonElement = screen.getByRole("button", {
    name: "Confirm Order",
  });
  expect(confirmOrderButtonElement).toBeDisabled();
  await user.click(termsAndConditionCheckboxElement);
  expect(confirmOrderButtonElement).toBeEnabled();
  await user.click(confirmOrderButtonElement);
  const loading = screen.queryByText(/loading/i);
  expect(loading).toBeInTheDocument();
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i, // Matches "Thank You" or "Thank You!"
  });
  expect(thankYouHeader).toBeInTheDocument();
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  const createNewOrderButtonElement = await screen.findByRole("button", {
    name: /create new order/i,
  });
  await user.click(createNewOrderButtonElement);
  const scoopsTotal = await screen.findByText("Scoops total : $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total : $0.00");
  expect(toppingsTotal).toBeInTheDocument();
});

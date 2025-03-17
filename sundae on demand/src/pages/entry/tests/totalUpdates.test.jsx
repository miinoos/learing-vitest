import { render, screen } from "../../../test-utils/testing-library";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop total from the scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />); //for context provider
  const scoopsSubtotal = screen.getByText("Scoops total : $", { exact: false }); //get the scoopsSubtotal element - partial string
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("4.00");
});

test("update scoop total from the toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  const toppingsSubTotal = screen.getByText("Toppings total : $", {
    exact: false,
  }); //partial match
  expect(toppingsSubTotal).toHaveTextContent("0.00");
  const mAndMsInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  expect(mAndMsInput).not.toBeChecked();
  await user.click(mAndMsInput);
  expect(mAndMsInput).toBeChecked();
  expect(toppingsSubTotal).toHaveTextContent("1.50");
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesInput).not.toBeChecked();
  await user.click(cherriesInput);
  expect(cherriesInput).toBeChecked();
  expect(toppingsSubTotal).toHaveTextContent("3.00");
  await user.click(cherriesInput);
  expect(cherriesInput).not.toBeChecked();
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  const user = userEvent.setup();
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total : $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total : $", { exact: false });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    const mAndMsInput = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    expect(mAndMsInput).not.toBeChecked();
    await user.click(mAndMsInput);
    expect(mAndMsInput).toBeChecked();
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total : $", { exact: false });
    const mAndMsInput = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    expect(mAndMsInput).not.toBeChecked();
    await user.click(mAndMsInput);
    expect(mAndMsInput).toBeChecked();
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total : $", { exact: false });
    const mAndMsInput = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    expect(mAndMsInput).not.toBeChecked();
    await user.click(mAndMsInput);
    expect(mAndMsInput).toBeChecked();
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "0");
    expect(grandTotal).toHaveTextContent("1.50");
  });
});

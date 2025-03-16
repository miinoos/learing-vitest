import SummaryForm from "../SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);

  const scoopList = scoopArray.map(([key, value], index) => {
    <li key={index}>
      {value} {key}
    </li>;
  });

  const toppingArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingArray.map((key, index) => (
    <li key={index}>{key}</li>
  ));

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops : {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings : {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </>
  );
};

export default OrderSummary;

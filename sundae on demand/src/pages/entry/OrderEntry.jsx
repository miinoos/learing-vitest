import Options from "./Options";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderEntry = () => {
  const { totals } = useOrderDetails();

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>{`Grand total : ${formatCurrency(
        totals.scoops + totals.toppings
      )}`}</h2>
    </>
  );
};

export default OrderEntry;

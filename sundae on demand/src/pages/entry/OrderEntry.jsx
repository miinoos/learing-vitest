import Options from "./Options";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  const orderDisabled = totals.scoops === 0;

  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>{`Grand total : ${formatCurrency(
        totals.scoops + totals.toppings
      )}`}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase("review")}>
        Order Sundae
      </Button>
    </>
  );
};

export default OrderEntry;

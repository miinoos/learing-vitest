import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingsOptions from "./ToppingsOptions";
import AlertBanner from "../common/alertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setitems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setitems(response.data))
      .catch((err) => {
        setError(true);
      }); //option type is scoop or toppings
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent =
    optionType === "scoops" ? ScoopOptions : ToppingsOptions;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item, index) => (
    <ItemComponent key={index} name={item.name} imgPath={item.imgPath} />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total : {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;

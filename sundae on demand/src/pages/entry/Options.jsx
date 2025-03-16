import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingsOptions from "./ToppingsOptions";
import AlertBanner from "../common/alertBanner";

const Options = ({ optionType }) => {
  const [items, setitems] = useState([]);
  const [error, setError] = useState("false");

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setitems(response.data))
      .catch((err) => setError(true)); //option type is scoop or toppings
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent =
    optionType === "scoops" ? ScoopOptions : ToppingsOptions;

  const optionItems = items.map((item, index) => (
    <ItemComponent key={index} name={item.name} imgPath={item.imgPath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;

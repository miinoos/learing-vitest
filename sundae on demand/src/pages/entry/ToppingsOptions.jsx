import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingsOptions = ({ name, imgPath }) => {
  const { optionCounts, updateItemCount } = useOrderDetails();

  const handleChange = (e) => {
    if (e.target.checked) {
      updateItemCount(name, 1, "toppings");
    } else {
      updateItemCount(name, 0, "toppings");
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imgPath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

export default ToppingsOptions;

import Col from "react-bootstrap/esm/Col";

const ToppingsOptions = ({ name, imgPath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img src={`http://localhost:3030/${imgPath}`} alt={`${name} topping`} />
    </Col>
  );
};

export default ToppingsOptions;

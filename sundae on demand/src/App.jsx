import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderSummary from "./pages/entry/OrderSummary";
import { useState } from "react";
import OrderConfirmation from "./pages/entry/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("in progress");

  return (
    <div>
      <Container>
        <OrderDetailsProvider>
          {orderPhase === "in progress" && (
            <OrderEntry setOrderPhase={setOrderPhase} />
          )}
          {orderPhase === "review" && (
            <OrderSummary setOrderPhase={setOrderPhase} />
          )}
          {orderPhase === "complete" && (
            <OrderConfirmation setOrderPhase={setOrderPhase} />
          )}
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;

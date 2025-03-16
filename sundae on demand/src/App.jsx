import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <div>
      <Container>
        <OrderDetailsProvider>
          <OrderEntry />
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;

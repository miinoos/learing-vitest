import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const SummaryForm = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);

  const popoverRight = (
    <Popover id="popover-positioned-right" title="Popover right">
      <div>
        <Popover.Body>No Icecream will actually be delivered.</Popover.Body>
      </div>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <span style={{ color: "blue" }}>
        <OverlayTrigger placement="right" overlay={popoverRight}>
          <span>Terms and Conditions</span>
        </OverlayTrigger>
      </span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!tcChecked}
        onClick={() => setOrderPhase("complete")}
      >
        Confirm Order
      </Button>
    </Form>
  );
};

export default SummaryForm;

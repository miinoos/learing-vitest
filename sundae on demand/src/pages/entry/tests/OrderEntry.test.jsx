import { render, screen } from "../../../test-utils/testing-library";
import { logRoles } from "@testing-library/react";
import OrderEntry from "../OrderEntry";

import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and topping routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  const { container } = render(<OrderEntry />);
  const alerts = await screen.findAllByText(
    "An unexpected error occured. Please try again later."
  ); //this is queried by text as bootstrap gives no names to alerts
  logRoles(container);

  expect(alerts).toHaveLength(2);
});

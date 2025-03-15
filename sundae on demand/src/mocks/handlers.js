import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://localhost:3030/scoops", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      { name: "Chocolate", imgPath: "/images/chocolate.png" },
      { name: "Vanilla", imgPath: "/images/vanilla.png" },
    ]);
  }),

  http.get("http://localhost:3030/toppings", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      { name: "Cherries", imgPath: "/images/cherries.png" },
      { name: "M&Ms", imgPath: "/images/m-and-ms.png" },
      { name: "Hot fudge", imgPath: "/images/hot-fudg.png" },
    ]);
  }),
];

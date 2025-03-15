import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop from server", async () => {
  render(<Options optionType="scoops" />);
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); // last word is scoop
  expect(scoopImages).toHaveLength(2); // mock service worker is defined for 2 images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

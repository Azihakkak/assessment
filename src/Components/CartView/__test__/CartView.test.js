import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CartView from "../CartView";

afterEach(cleanup);

it("renders result", () => {
  const { getByTestId } = render(
    <CartView cart={{ "Shower gel": { quantity: 5, price: 49.99 } }} />
  );

  const name = getByTestId("name");
  expect(name).toHaveTextContent("Shower gel");
});

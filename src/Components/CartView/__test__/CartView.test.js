import React from "react";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import CartView from "../CartView";

afterEach(cleanup);

it("Should render one item", () => {
  const tree = renderer
    .create(<CartView cart={{ "Shower gel": { quantity: 5, price: 49.99 } }} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("Should show 2 items in the cart", () => {
  const { getByText, queryAllByTestId } = render(
    <CartView
      cart={{
        "Shower gel": { quantity: 2, price: 49.99 },
        Deodorant: { quantity: 2, price: 99.99 },
      }}
      tax={"12.5"}
    />
  );

  expect(getByText("Item: Shower gel")).toBeInTheDocument();
  expect(getByText("Item: Deodorant")).toBeInTheDocument();
  expect(queryAllByTestId("quantity")[0]).toHaveTextContent("2");
  expect(queryAllByTestId("quantity")[1]).toHaveTextContent("2");
  expect(getByText("UnitPrice: $49.99")).toBeInTheDocument();
  expect(getByText("UnitPrice: $99.99")).toBeInTheDocument();
  expect(getByText("Total Tax: $37.50")).toBeInTheDocument();
  expect(getByText("Total Price IncludingTax: $337.46")).toBeInTheDocument();
});

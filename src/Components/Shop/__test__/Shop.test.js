import React from "react";
import ReactDOM from "react-dom";
import Shop, { OwnProps } from "../Shop";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import CartView from "../../CartView/CartView";

afterEach(cleanup);

it("renders correctly", () => {
  const { queryByTestId } = render(<Shop />);

  expect(queryByTestId("item-selection")).toBeTruthy();
  expect(queryByTestId("qty")).toBeTruthy();
});

describe("select value", () => {
  it("updates on change", () => {
    const { queryByTestId } = render(<Shop />);

    const selectInput = queryByTestId("item-selection");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    expect(selectInput.value).toBe("Shower gel");
  });
});

describe("select amount", () => {
  it("add quantity", () => {
    const { queryByTestId } = render(<Shop />);

    const inputQty = queryByTestId("qty");

    fireEvent.change(inputQty, { target: { value: "5" } });

    expect(inputQty.value).toBe("5");
  });
});

describe("when added to cart my CartView componant should have the cart object", () => {
  it("CartView should have the cart object", () => {
    const { queryByTestId } = render(
      <Shop>
        <CartView />
      </Shop>
    );

    const selectInput = queryByTestId("item-selection");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    const inputQty = queryByTestId("qty");

    fireEvent.change(inputQty, { target: { value: "5" } });

    const button = queryByTestId("button");

    fireEvent.click(button);

    const cartComponent = queryByTestId("cart-view");

    expect(cartComponent).toBeTruthy();
  });
});

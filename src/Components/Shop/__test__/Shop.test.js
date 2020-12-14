import React from "react";
import Shop from "../Shop";
import { render, fireEvent, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("Renders correctly", () => {
  const tree = renderer.create(<Shop />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should update selected item", () => {
  const { queryByTestId } = render(<Shop />);

  const selectInput = queryByTestId("item-selection");

  fireEvent.change(selectInput, { target: { value: "Shower gel" } });

  expect(selectInput.value).toBe("Shower gel");
});

it("Should update item quantity", () => {
  const { queryByTestId } = render(<Shop />);

  const inputQty = queryByTestId("qty");

  fireEvent.change(inputQty, { target: { value: "5" } });

  expect(inputQty.value).toBe("5");
});

describe("when user adds 5 Shower gels to the cart ", () => {
  it("should return showerGelQty: 5, unitPrice: 49.99, priceExcludingTax: 249.95 ", () => {
    const { queryByTestId, getByText } = render(<Shop />);

    const selectInput = queryByTestId("item-selection");
    const inputQty = queryByTestId("qty");
    const button = queryByTestId("button");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    fireEvent.change(inputQty, { target: { value: "5" } });

    fireEvent.click(button);

    expect(queryByTestId("name")).toHaveTextContent("Item: Shower gel");
    expect(getByText("Qty: 5")).toBeInTheDocument();
    expect(getByText("UnitPrice: $49.99")).toBeInTheDocument();
    expect(getByText("Total Price: $249.95")).toBeInTheDocument();
  });
});

describe("when user adds 5 Shower gels and again adds 3 more shower gels to the cart ", () => {
  it("should return showerGelQty: 8, unitPrice: 49.99, priceExcludingTax: 399.92 ", () => {
    const { queryByTestId, getByText } = render(<Shop />);

    let selectInput = queryByTestId("item-selection");
    let inputQty = queryByTestId("qty");
    let button = queryByTestId("button");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    fireEvent.change(inputQty, { target: { value: "5" } });

    fireEvent.click(button);

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    fireEvent.change(inputQty, { target: { value: "3" } });

    fireEvent.click(button);

    expect(queryByTestId("name")).toHaveTextContent("Item: Shower gel");
    expect(getByText("Qty: 8")).toBeInTheDocument();
    expect(getByText("UnitPrice: $49.99")).toBeInTheDocument();
    expect(getByText("Total Price: $399.92")).toBeInTheDocument();
  });
});

describe("User adds 2 Shower gels and then adds 2 Deodorants to the cart with tax rate 12.5", () => {
  it("should return shower gel, qty:2, unitPrice: 49.99, Deodorant, qty:2, unitprice:99.99 Tax: 37.50, totalprice:337.46 ", () => {
    const { queryByTestId, getByText, queryAllByTestId } = render(<Shop />);

    let selectInput = queryByTestId("item-selection");
    let inputQty = queryByTestId("qty");
    let button = queryByTestId("button");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    fireEvent.change(inputQty, { target: { value: "2" } });

    fireEvent.click(button);

    fireEvent.change(selectInput, { target: { value: "Deodorant" } });

    fireEvent.change(inputQty, { target: { value: "2" } });

    fireEvent.click(button);

    expect(getByText("Item: Shower gel")).toBeInTheDocument();
    expect(getByText("Item: Deodorant")).toBeInTheDocument();
    expect(queryAllByTestId("quantity")[0]).toHaveTextContent("2");
    expect(queryAllByTestId("quantity")[1]).toHaveTextContent("2");
    expect(getByText("UnitPrice: $49.99")).toBeInTheDocument();
    expect(getByText("UnitPrice: $99.99")).toBeInTheDocument();
    expect(getByText("Total Tax: $37.50")).toBeInTheDocument();
    expect(getByText("Total Price IncludingTax: $337.46")).toBeInTheDocument();
  });
});

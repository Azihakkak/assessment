import React from "react";
import ReactDOM from "react-dom";
import Shop from "../Shop";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

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

describe("when user adds 5 Shower gels to the cart ", () => {
  it("should return showerGelQty: 5, unitPrice: 49.99, priceExcludingTax: 249.95 ", () => {
    const { queryByTestId, getByText } = render(<Shop />);

    const selectInput = queryByTestId("item-selection");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    const inputQty = queryByTestId("qty");

    fireEvent.change(inputQty, { target: { value: "5" } });

    const button = queryByTestId("button");

    fireEvent.click(button);

    expect(getByText("Total Price: $249.95")).toBeInTheDocument();
  });
});

describe("when user adds 5 Shower gels and again adds 3 more shower gels to the cart ", () => {
  it("should return showerGelQty: 8, unitPrice: 49.99, priceExcludingTax: 399.92 ", () => {
    const { queryByTestId, getByText } = render(<Shop />);

    const selectInput = queryByTestId("item-selection");

    fireEvent.change(selectInput, { target: { value: "Shower gel" } });

    const inputQty = queryByTestId("qty");

    fireEvent.change(inputQty, { target: { value: "5" } });

    const selectInput1 = queryByTestId("item-selection");

    fireEvent.change(selectInput1, { target: { value: "Shower gel" } });

    const inputQty2 = queryByTestId("qty");

    fireEvent.change(inputQty2, { target: { value: "3" } });

    const button = queryByTestId("button");

    fireEvent.click(button);

    expect(getByText("Total Price: $399.92")).toBeInTheDocument();
  });
});

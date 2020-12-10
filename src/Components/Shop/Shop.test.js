import React, { Component } from "react";
import Shop from "./Shop";
import renderer from "react-test-renderer";

describe("Shop component", () => {
  test("should render shop component", () => {
    const component = renderer.create(<Shop />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("should add shopping gel to the empty cart", () => {
    const component = renderer.create(<Shop />);

    // component.findByName("shopping items");
  });
});

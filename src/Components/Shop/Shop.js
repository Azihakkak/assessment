import React, { Component } from "react";

import CartView from "../CartView/CartView";

const items = [
  { name: "Shower gel", price: 49.99 },
  { name: "Deodorant", price: 99.99, id: 2 },
];

const taxRate = 12.5;

export default class Shop extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: "Shower gel",
      itemQty: 1,
      cart: {},
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    this.setState({
      itemQty: this.state.itemQty + 1,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const selectedItem = this.state.selectedItem;
    const qty = this.state.itemQty;
    let cart = this.state.cart;

    const newQuantity = cart[selectedItem]
      ? +cart[selectedItem].quantity + +qty
      : qty;
    const item = items.find((item) => item.name === selectedItem);

    cart[selectedItem] = {
      quantity: newQuantity,
      price: item.price,
    };

    this.setState({ ...this.state, cart });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select your item
            <select
              data-testid="item-selection"
              value={this.state.selectedItem}
              onChange={this.handleChange}
              name="selectedItem"
            >
              <option value="Shower gel">Shower gel</option>
              <option value="Deodorant">Deodorant</option>
            </select>
          </label>
          <div>
            <input
              data-testid="qty"
              name="itemQty"
              type="number"
              value={this.state.itemQty}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" value="Add to cart" data-testid="button" />
        </form>
        <div data-testid="cart-view">
          <CartView cart={this.state.cart} tax={taxRate} />
        </div>
      </div>
    );
  }
}

import React from "react";

const hundred = 100;
const roundedDecimal = 2;

export default function CartView({ cart, tax }) {
  const taxExcludedTotal = () => {
    let totalPrice = 0;
    Object.values(cart).forEach((item) => {
      totalPrice += +item.price * +item.quantity;
    });
    return (Math.ceil(totalPrice * hundred + Number.EPSILON) / hundred).toFixed(
      roundedDecimal
    );
  };

  const calculateTax = () => {
    const total = taxExcludedTotal();
    const result = (total * tax) / hundred;
    return (Math.ceil(result * hundred + Number.EPSILON) / hundred).toFixed(
      roundedDecimal
    );
  };

  const taxIncludedTotal = () => {
    const total = taxExcludedTotal();
    const tax = calculateTax();
    const result = +total + +tax;
    return result;
  };

  function renderTableData() {
    return Object.entries(cart).map(([key]) => {
      const name = key;
      const quantity = cart[key].quantity;
      const price = cart[key].price;

      return (
        <tr key={name}>
          <td data-testid="name">Item: {name}</td>
          <td data-testid="quantity">Qty: {quantity}</td>
          <td data-testid="price">UnitPrice: ${price}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <table>
        <tbody>{renderTableData()}</tbody>
      </table>
      <h3>Total Tax: ${calculateTax()}</h3>
      <h3>Total Price: ${taxExcludedTotal()}</h3>
      <h3>Total Price IncludingTax: ${taxIncludedTotal()}</h3>
    </div>
  );
}

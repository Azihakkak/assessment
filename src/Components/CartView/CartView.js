import React from "react";

// cart = {
//   "shower gel": { quantity: 1, price: 49.99 },
//   "deodorant": { quantity: 3, price: 99.99 },
// };

export default function CartView({ cart, tax }) {
  // console.log(cart);
  const taxExcludedTotal = () => {
    let totalPrice = 0;
    Object.values(cart).forEach((item) => {
      totalPrice += +item.price * +item.quantity;
    });
    return (Math.ceil(totalPrice * 100 + Number.EPSILON) / 100).toFixed(2);
  };

  const calculateTax = () => {
    const total = taxExcludedTotal();
    //return console.log(total);
    const result = (total * tax) / 100;
    return (Math.ceil(result * 100 + Number.EPSILON) / 100).toFixed(2);
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
          <td>{name}</td>
          <td>{quantity}</td>
          <td>{price}</td>
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

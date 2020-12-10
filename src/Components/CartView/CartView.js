import React from "react";

// cart = {
//   "shower gel": { quantity: 1, price: 49.99 },
//   deodorant: { quantity: 3, price: 99.99 },
// };

export default function CartView({ cart, tax }) {
  const taxExcludedTotal = () => {
    let totalPrice = 0;
    Object.values(cart).map((item) => {
      return (totalPrice += +item.price);
    });
    return totalPrice;
  };

  const calculateTax = () => {
    const total = taxExcludedTotal();
    return (total * +tax) % 100;
  };

  const taxIncludedTotal = () => {
    const total = taxExcludedTotal();
    const tax = calculateTax();
    return total + tax;
  };

  function renderTableData() {
    return Object.entries(cart).forEach(([key]) => {
      console.log(key);
      const name = key;
      const quantity = cart[key].quantity;
      const price = cart[key].price;

      return (
        <tr key={name}>
          <td>{name}</td>
          <td>{quantity}</td>
          <td>{price}</td>
          <td>{calculateTax}</td>
          <td>{taxIncludedTotal}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <table>
        <tbody>{renderTableData}</tbody>
      </table>
    </div>
  );
}

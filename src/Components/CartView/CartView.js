import React from "react";

// cart = {
//   "shower gel": { quantity: 1, price: 49.99 },
//   deodorant: { quantity: 3, price: 99.99 },
// };

export default function CartView({ cart }) {
  function renderTableData() {
    return Object.entries(cart).forEach(([key]) => {
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
        <tbody>{renderTableData}</tbody>
      </table>
    </div>
  );
}

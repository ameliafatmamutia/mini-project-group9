import React, { useState } from 'react';
import '../assets/styles/Cart.css';

const mockItems = [
    { id: 1, name: 'Product A', price: 100000, quantity: 2 },
    { id: 2, name: 'Product B', price: 250000, quantity: 1 },
    { id: 3, name: 'Product C', price: 50000, quantity: 3 }
];

const Cart = () => {

  const [items, setItems] = useState(mockItems);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='Cart'>
      <h2>Cart</h2>
      <br />
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price (IDR)</th>
              <th>Quantity</th>
              <th>Total (IDR)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString('id-ID')}</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
          <br />
          <tfoot>
            <tr>
              <td colSpan={4} style={{ textAlign: 'right' }} className='Bold'>Total:</td>
              <td>{totalAmount.toLocaleString('id-ID')}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Cart;
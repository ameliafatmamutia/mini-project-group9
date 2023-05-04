import React, { useState } from 'react';
import '../assets/styles/Cart.css';
import { clearCart, removeItem } from '../redux/slice';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const Cart = (props) => {
  const data = props.items.items;

  const [cart, setCart] = useState(data.map(item => ({...item, Quantity: 1})));

  const handleDecrement = (index) => {
    const newCart = [...cart];
    if (newCart[index].Quantity > 1) {
      newCart[index].Quantity -= 1;
      setCart(newCart);
    }
  };

  const handleIncrement = (index) => {
    const newCart = [...cart];
    newCart[index].Quantity += 1;
    setCart(newCart);
  };

  const totalAmount = cart.reduce((total, item) => total + (item.Price * item.Quantity), 0);

  return (
    <div className='Cart'>
      <h2>Cart</h2>
      <br />
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price (IDR)</th>
              <th>Quantity</th>
              <th>Total (IDR)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td className='tableImage'>
                    <img src={item.Img} alt="" />
                </td>
                <td className='product'>{item.Product_Name}</td>
                <td>{item.Price.toLocaleString('id-ID')}</td>
                <td className='quantity'>
                <Button className='qButton' onClick={() => {
                  if (item.Quantity > 1) {
                    setCart(prevCart => {
                      const newCart = [...prevCart];
                      newCart[index].Quantity -= 1;
                      return newCart;
                    });
                  } else {
                    setCart(prevCart => prevCart.filter((cartItem, i) => i !== index));
                  }
                }}>-</Button>
                  <p>{item.Quantity}</p>
                  <Button className='qButton' onClick={() => handleIncrement(index)}>+</Button>
                </td>
                <td>{(item.Price * item.Quantity).toLocaleString('id-ID')}</td>
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
      <Button variant='success' onClick={() => console.log(cart)}>
        click me
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    items: state.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeItem: () => dispatch(removeItem()),
    clearCart: () => dispatch(clearCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

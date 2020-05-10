import React from 'react';
import CartContext from './cartProvider';

import Checkout from '../Stripe/Checkout';

export function displayItems(items) {
  var productsInCart = [];

  Object.keys(items).forEach(function (key) {
    var product = {};
    product.id = key;
    product.price = items[key].price;
    product.quantity = items[key].quantity;
    productsInCart.push(product);
  });

  return productsInCart;
}

// TODO: test loading time
const Cart = () => {
  return (
    <div>
      <CartContext.Consumer>
        {(context) => {
          console.log(context);
          return (
            <div>
              {displayItems(context.cartItems).map((product) => {
                return (
                  <div key={product.key}>
                    <div>Quantity: {product.quantity}</div>
                    <div>ID: {product.id}</div>
                    <div>Price: {product.price}</div>
                    <div>Description: {product.desc}</div>
                    <img src={product.image} alt="Product Image" />
                    <button
                      onClick={(e) =>
                        context.removeFromCart(
                          product.id,
                          product.price,
                          1,
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <div>Total: {context.cartTotal}</div>
              <button onClick={context.emptyCart}>Empty Cart</button>
              <Checkout />
            </div>
          );
        }}
      </CartContext.Consumer>
    </div>
  );
};

export default Cart;

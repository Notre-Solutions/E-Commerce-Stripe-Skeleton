import React, { useContext, Fragment } from 'react';
import CartContext from './cartProvider';

import { GetProduct, GetProducts } from '../Stripe/Products';

import Checkout from '../Stripe/Checkout';

export function displayItems(items) {
  console.log(items);
  var productsInCart = [];

  Object.keys(items).forEach(function (key) {
    var product = {}
    product.key = key
    product.price = items[key].price
    product.quantity = items[key].quantity;
    productsInCart.push(product);
  });

  return productsInCart;
}

// TODO: test loading time
const Cart = () => {
  // var cartItems = context.cartItems;
  // var productsInCart = [];
  // var checkOutItems = [];

  // Object.keys(cartItems).forEach(function (key) {
  //   var product = GetProduct(key);
  //   console.log(key);
  //   console.log(product);
  //   product.quantity = cartItems[key].quantity;
  //   productsInCart.push(product);
  //   checkOutItems.push({
  //     sku: key,
  //     quantity: cartItems[key].quantity,
  //   });
  // });

  return (
    <div>
      <CartContext.Consumer>
        {(context) => {
          return (
            <div>
              {displayItems(context.cartItems).map((product) => {
                return (
                  <div key={product.key}>
                    {/* <div>Price: {product.node.price}</div> */}
                    <div>Quantity: {product.quantity}</div>
                  </div>
                );
              })}
            </div>
          );
        }}
      </CartContext.Consumer>
      {/* {productsInCart.map((product) => {
        return (
          <div key={product.node.id}>
            <div>Name: {product.node.product.name}</div>
            <div>Price: {product.node.price}</div>
            <div>
              Category: {product.node.product.metadata.Category}
            </div>
            <div>Quantity: {product.quantity}</div>
            <img src={product.node.imgage} alt="Product Image" />
          </div>
        );
      })}
      <Checkout items={checkOutItems} /> */}
    </div>
  );
};

export default Cart;

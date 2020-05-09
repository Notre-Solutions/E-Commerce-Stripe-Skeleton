import React, { Component, useState } from 'react';
import CartContext from './context';
import cookie from 'react-cookies';
import { GetProduct, GetProducts } from '../Stripe/Products';
class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateProducts = this.updateProducts.bind(this);

    this.state = {
      cartItems: {},
      cartTotal: 0,
      allProducts: [],
      updateProducts: this.updateProducts,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    };
  }

  // componentWillMount() {
  // this.setState({
  //   cartItems: cookie.load('cartItems') || {},
  //   cartTotal: cookie.load('cartTotals') || 0,
  // });
  // }

  saveInCookies(total, items) {
    // cookie.save('cartItems', items, { path: '/' });
    // cookie.save('cartTotals', total, { path: '/' });
  }

  addToCart = (quantity, skuId, price, authUser) => {
    const cartTotal =
      Number(this.state.cartTotal) + Number(quantity) * Number(price);

    var currentCartItems = this.state.cartItems;
    if (currentCartItems[skuId]) {
      currentCartItems[skuId].quantity += quantity;
    } else {
      currentCartItems[skuId] = { price, quantity };
    }

    this.saveInCookies(cartTotal, currentCartItems);

    this.setState({
      cartTotal,
      cartItems: currentCartItems,
    });
  };

  updateProducts = (Products) => {
    this.setState({
      allProducts: Products,
    });
  };

  removeFromCart = (cartItem, authUser) => {
    const cartTotal =
      Number(this.state.cartTotal) - Number(cartItem.price);

    var currentCartItems = this.state.cartItems;
    var index = currentCartItems.indexOf(cartItem.id);
    if (index !== -1) {
      currentCartItems.slice(index, 1);
    }

    this.saveInCookies(cartTotal, currentCartItems);

    return this.setState(() => ({
      cartTotal,
      cartItems: currentCartItems,
    }));
  };

  render() {
    return (
      <CartContext.Provider value={{ ...this.state }}>
        <>{this.props.children}</>
      </CartContext.Provider>
    );
  }
}

export default CartContext;
export { CartProvider };

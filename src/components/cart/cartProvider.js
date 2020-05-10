import React, { Component } from 'react';
import CartContext from './context';
import cookie from 'react-cookies';

class CartProvider extends Component {
  _initFirebase = false;
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.emptyCart = this.emptyCart.bind(this);

    this.state = {
      cartItems: {},
      checkoutItems: [],
      cartTotal: 0,
      emptyCart: this.emptyCart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    };
  }

  componentWillMount() {
    this.setState({
      cartItems: cookie.load('cartItems') || {},
      cartTotal: cookie.load('cartTotals') || 0,
      checkoutItems: cookie.load('checkoutItems') || [],
    });
  }

  saveInCookies(total, items, checkout) {
    cookie.save('cartItems', items, { path: '/' });
    cookie.save('cartTotals', total, { path: '/' });
    cookie.save('checkoutItems', checkout, { path: '/' });
  }

  emptyCart = () => {
    this.setState({
      cartItems: {},
      cartTotal: 0,
      checkoutItems: [],
    });
    this.saveInCookies(0, {}, []);
  };

  addToCart = (quantity, skuId, price, desc, img, productId) => {
    const cartTotal =
      Number(this.state.cartTotal) + Number(quantity) * Number(price);

    var currentCartItems = this.state.cartItems;
    var checkoutItems = this.state.checkoutItems;
    if (currentCartItems[skuId]) {
      currentCartItems[skuId].quantity += quantity;
      checkoutItems.forEach((item) => {
        if (item.sku === skuId) {
          item.quantity += quantity;
        }
      });
    } else {
      currentCartItems[skuId] = {
        price,
        quantity,
        skuId,
        desc,
        img,
        productId,
      };
      checkoutItems.push({ sku: skuId, quantity });
    }

    this.saveInCookies(cartTotal, currentCartItems, checkoutItems);

    this.setState({
      cartTotal,
      cartItems: currentCartItems,
      checkoutItems,
    });
    console.log(checkoutItems);
    console.log(this.state.checkoutItems);
  };

  removeFromCart = (skuId, price, quantity) => {
    var currentCartItems = this.state.cartItems;
    var checkoutItems = this.state.checkoutItems;
    if (currentCartItems[skuId]) {
      const cartTotal =
        Number(this.state.cartTotal) -
        Number(price) * Number(quantity);

      if (currentCartItems[skuId].quantity > quantity) {
        currentCartItems[skuId].quantity =
          currentCartItems[skuId].quantity - quantity;
        checkoutItems.forEach((item) => {
          if (item.sku === skuId) {
            item.quantity -= quantity;
          }
        });
      } else {
        delete currentCartItems[skuId];
        checkoutItems.forEach((item, i) => {
          if (item.sku === skuId) {
            checkoutItems.slice(i, 1);
          }
        });
      }

      this.saveInCookies(cartTotal, currentCartItems, checkoutItems);

      return this.setState(() => ({
        cartTotal,
        cartItems: currentCartItems,
        checkoutItems,
      }));
    } else {
      throw new Error('Item not in cart');
    }
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

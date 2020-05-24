import React, { Component } from 'react';
import Layout from '../components/layout';

import Bag from '../components/cart/cartComponent';

/**
 * @file cart.js is the cart page.
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div className="container">
          <Bag />
        </div>
      </Layout>
    );
  }
}

export default Cart;

import React, { Component } from 'react';
import Layout from '../components/layout';
import { CartContext } from '../components/cart';
import { AuthUserContext } from '../components/Session';

import Bag from '../components/cart/cartComponent';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Bag />
      </Layout>
    );
  }
}

export default Cart;

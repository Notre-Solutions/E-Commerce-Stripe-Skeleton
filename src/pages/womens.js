import React, { Component } from 'react';
import Layout from '../components/layout';
import Products from '../components/Stripe/Products';

/**
 * @file cart.js is the cart page.
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

class Women extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Products />
      </Layout>
    );
  }
}

export default Women;

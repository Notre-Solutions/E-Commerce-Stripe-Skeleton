import React, { Component } from 'react';
import { CartContext } from '../components/cart';
import Layout from '../components/layout';

/**
 * @file payment-success.js this is the page user is sent to when stripe payment is successful
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

/**
 * Class to empty the cart after the stripe payment is sucessful
 *
 */
class PaymentSuccessSub extends Component {
  componentDidMount() {
    this.props.context.emptyCart();
  }

  render() {
    return (
      <Layout>
        <div>SUCCESS!!! WOOO</div>
      </Layout>
    );
  }
}

const PaymentSuccess = () => (
  <CartContext.Consumer>
    {(context) => <PaymentSuccessSub context={context} />}
  </CartContext.Consumer>
);

export default PaymentSuccess;

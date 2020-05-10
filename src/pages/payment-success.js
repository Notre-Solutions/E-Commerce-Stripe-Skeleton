import React, { Component } from 'react';
import { CartContext } from '../components/cart';
import Layout from '../components/layout';

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

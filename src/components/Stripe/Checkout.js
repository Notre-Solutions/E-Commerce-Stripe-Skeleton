'use strict';
import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../cart';

const CheckoutWrapper = () => {
  return (
    <CartContext.Consumer>
      {(context) => {
        console.log(context.checkoutItems);
        return <Checkout items={context.checkoutItems} />;
      }}
    </CartContext.Consumer>
  );
};
export const Checkout = ({ items }) => {
  const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);
  const redirectToCheckout = async (event) => {
    event.preventDefault();
    const stripeCheckout = await stripePromise;
    const { error } = await stripeCheckout.redirectToCheckout({
      shippingAddressCollection: {
        allowedCountries: ['GB'],
      },
      items: items,
      successUrl: `http://localhost:8000/payment-success/`,
      cancelUrl: `http://localhost:8000/payment-failure/`,
    });
    if (error) {
      console.warn('Error:', error);
    }
  };
  return (
    <div>
      <div className="checkout" onClick={redirectToCheckout}>
        SECURE CHECKOUT <span className="fa fa-chevron-right"></span>
      </div>
    </div>
  );
};
export default CheckoutWrapper;

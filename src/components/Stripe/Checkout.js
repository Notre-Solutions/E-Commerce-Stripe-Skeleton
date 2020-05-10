"use strict"
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../cart';

const CheckoutWrapper = () => {
  return (
    <CartContext.Consumer>
      {context => {
        return (
          <Checkout items={context.cartItems}/>
        )
      }}
    </CartContext.Consumer>
  )
}

export const Checkout = ({ items }) => {
  const buttonStyles = {
    fontSize: '13px',
    color: '#fff',
    outline: 'none',
    padding: '12px 60px',
    boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
    backgroundColor: 'rgb(255, 178, 56)',
    borderRadius: '6px',
    letterSpacing: '1.5px',
  };
  const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);
  const redirectToCheckout = async (event) => {
    event.preventDefault();
    const stripeCheckout = await stripePromise;
    const { error } = await stripeCheckout.redirectToCheckout({
      shippingAddressCollection: {
        allowedCountries: ['GB'],
      },
      items: items,
      successUrl: `http://localhost:8000/success/`,
      cancelUrl: `http://localhost:8000/failed/`,
    });
    if (error) {
      console.warn('Error:', error);
    }
  };
  //TODO: Once we have checkoutItems in the context, we can remove the below method and change the onclick to trigger the redirectToCheckout
  const displayItems = () => {
    console.log(items);
  }
  return (
    <div>
      <button style={buttonStyles} onClick={displayItems}>
        CheckOut
      </button>
    </div>
  );
};
export default CheckoutWrapper;

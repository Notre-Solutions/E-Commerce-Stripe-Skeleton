import React, { Fragment, useContext, useEffect } from 'react';
import Layout from '../components/layout';
import { GetProducts } from '../components/Stripe/Products';
import { CartContext } from '../components/cart';

function LandingPage() {
  return (
    <Fragment>
      <h1>Landing</h1>
      <p>
        The Landing Page is open to everyone, even though the user
        isn't signed in.
      </p>
    </Fragment>
  );
}

function Landing() {
  var context = useContext(CartContext);

  return (
    <CartContext.Consumer>
      {(context) => {
        // console.log(context);
        // context.updateProducts(products);
        // (e)=>context.updateProducts(products);
        return (
          <Layout>
            <LandingPage />
          </Layout>
        );
      }}
    </CartContext.Consumer>
  );
}

export default Landing;

import React from 'react';
import Layout from '../components/layout';

/**
 * @file payment-failure.js this is the page user is sent to when stripe payment is not successful
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

export default function paymentFailure() {
  return (
    <Layout>
      <div>PAYMENT FAILED! GET MORE MONEYYYYY</div>
    </Layout>
  );
}

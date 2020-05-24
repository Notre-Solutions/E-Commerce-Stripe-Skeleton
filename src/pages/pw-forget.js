import React, { Fragment } from 'react';

import Layout from '../components/layout';
import PasswordForgetForm from '../components/PasswordForget';

/**
 * @file payment-success.js this is the page user is sent to when stripe payment is successful
 * @author Stephen Kelehan and Nyasha Mutangadura
 */
const PasswordForgetPage = () => (
  <Fragment>
    <div className="passwordForgetPage">
      <h1>Forgot Your Password?</h1>
      <PasswordForgetForm />
    </div>
  </Fragment>
);

export default () => (
  <Layout>
    <PasswordForgetPage />
  </Layout>
);

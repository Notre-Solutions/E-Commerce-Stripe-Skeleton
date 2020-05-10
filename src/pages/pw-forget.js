import React, { Fragment } from 'react';

import Layout from '../components/layout';
import PasswordForgetForm from '../components/PasswordForget';

/**
 * @file payment-success.js this is the page user is sent to when stripe payment is successful
 * @author Stephen Kelehan and Nyasha Mutangadura
 */
const PasswordForgetPage = () => (
  <Fragment>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </Fragment>
);

export default () => (
  <Layout>
    <PasswordForgetPage />
  </Layout>
);

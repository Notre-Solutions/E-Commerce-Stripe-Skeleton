import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';

/**
 * @file signup.js
 * @desc This is how ones sign up to the site
 * @author Stephen Kelehan and Nyasha Mutangadura
 */
const SignUpPage = () => (
  <Fragment>
    <h1>SignUp</h1>
    <SignUpForm />
  </Fragment>
);

export default () => (
  <Layout>
    <SignUpPage />
  </Layout>
);

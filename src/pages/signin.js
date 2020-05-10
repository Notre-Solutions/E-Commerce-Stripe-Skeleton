import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';
import { SignUpLink } from '../components/SignUp';
import { PasswordForgetLink } from '../components/PasswordForget';

/**
 * @file signin.js
 * @desc This allows the user to sign in with FB, Google, Twitter and with password and email
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

const SignInPage = () => (
  <Fragment>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <PasswordForgetLink />
    <SignUpLink />
  </Fragment>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);

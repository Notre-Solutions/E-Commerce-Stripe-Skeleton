import React, { Fragment, Component } from 'react';

import Layout from '../components/layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';
import { PasswordForgetLink } from '../components/PasswordForget';
import SignUpForm from '../components/SignUp';
import { Tabs } from '@yazanaabed/react-tabs';

/**
 * @file signin.js
 * @desc This allows the user to sign in with FB, Google, Twitter and with password and email
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

class Signin extends Component {
  render() {
    return (
      <div className="signIn container">
        <Fragment>
          <h1>My Account</h1>
          <Tabs
            activeTab={{
              id: 'tab1',
            }}
          >
            <Tabs.Tab
              id="tab1"
              title="RETURNING CUSTOMER"
              style={{ color: 'black' }}
            >
              <div style={{ padding: 10 }}>
                <SignInForm />
                <PasswordForgetLink />
                <SignInGoogle />
                <SignInFacebook />
                <SignInTwitter />
              </div>
            </Tabs.Tab>
            <Tabs.Tab id="tab2" title="NEW CUSTOMER">
              <div style={{ padding: 10 }}>
                <SignUpForm />
              </div>
            </Tabs.Tab>
          </Tabs>
        </Fragment>
      </div>
    );
  }
}

export default () => (
  <Layout>
    <Signin />
  </Layout>
);

import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import PasswordForgetForm from '../components/PasswordForget';
import PasswordChangeForm from '../components/PasswordChange';
import LoginManagement from '../components/LoginManagement';
import SideTab from '../components/SideTabBar';
/**
 * @file account.js has both Password Forgot and Password Change functionality
 * @author Nyasha Mutangadura and Stephen Kelehan
 */

const tabName = [
  'Your Orders',
  'Update Your Details',
  'Refer A Friend',
  'Countact Us',
  'Refunds',
  'Log Out',
];
const tabConent = [<></>, <></>, <></>, <></>, <></>, <></>];

const AccountPageBase = () => (
  <Fragment>
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div className="container">
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
          <SideTab tabNames={tabName} tabContent={tabConent} />
        </div>
      )}
    </AuthUserContext.Consumer>
  </Fragment>
);

const condition = (authUser) => !!authUser;

/**
 * Page is wrapped in withAuth and withEmail
 * Thus it is onluy avalible when email is verified and user is signed in
 *
 */

const AccountPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPageBase);

export default () => (
  <Layout>
    <AccountPage />
  </Layout>
);

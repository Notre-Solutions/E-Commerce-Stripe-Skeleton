import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import SideTab from '../components/SideTabBar';
import {
  UpdateYourDetails,
  UserFavs,
  YourOrders,
} from '../components/AccountContent';
/**
 * @file account.js has both Password Forgot and Password Change functionality
 * @author Nyasha Mutangadura and Stephen Kelehan
 */

const tabName = [
  'Your Orders',
  'Update Your Details',
  'Favourites',
  'Refer A Friend',
  'Countact Us',
  'Log Out',
];
const tabConent = [
  <>
    {' '}
    <YourOrders />
  </>,
  <>
    <UpdateYourDetails />
  </>,
  <>
    <UserFavs />
  </>,
  <></>,
  <></>,
  <></>,
];

const AccountPageBase = () => (
  <Fragment>
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div className="container accountPage">
          <h1>{authUser.username}'s Account</h1>
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

import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import { UserList } from '../components/Users';
import * as ROLES from '../constants/roles';

/**
 * @file admin.js is only avalible to a user signed in as admin.
 *
 * @author Nyasha Mutangadura and Stephen Kelehan
 */

/**
 * Admin function
 * @returns {UserList} - List of all the users that have made an account
 */

const AdminPageBase = () => (
  <Fragment>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <UserList />
  </Fragment>
);

const condition = (authUser) =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const AdminPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPageBase);

export default () => (
  <Layout>
    <AdminPage />
  </Layout>
);

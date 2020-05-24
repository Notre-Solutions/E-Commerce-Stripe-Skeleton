import React from 'react';

import Layout from '../components/layout';

/**
 * @file signup.js
 * @desc This is how ones sign up to the site
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

function LoggedOut() {
  return (
    <>
      <Layout>
        <div className="loggedOut">
          <div>You are Logged Out</div>
          <div>Enjoy Your Day</div>
        </div>
      </Layout>
    </>
  );
}

export default LoggedOut;

import React, { Fragment } from 'react';
import Layout from '../components/layout';

/**
 * @file index.js is the root file for this exmple app it is the landing page
 * @author Nyasha Mutangadura and Stephen Kelehan
 * @see <a href="https://notre-studio.co.uk">Notre-Studio</a>
 */

function LandingPage() {
  return (
    <Fragment>
      <h1>Landing</h1>
      <p>
        The Landing Page is open to everyone, even though the user
        isn't signed in.
      </p>
    </Fragment>
  );
}

function Landing() {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}

export default Landing;

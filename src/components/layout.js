import React, { Component, Fragment } from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';
import '../css/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

/**
 * @file payment-success.js this is the page user is sent to when stripe payment is successful
 * @author Stephen Kelehan and Nyasha Mutangadura
 */
class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then((values) => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication
          {...this.props}
        ></AppWithAuthentication>
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <Fragment>
    <Navigation />
    <div className="layout">{children}</div>
    <div className="push"></div>
    <Footer />
  </Fragment>
));

export default Layout;

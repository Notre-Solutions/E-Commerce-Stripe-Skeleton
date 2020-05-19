import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
// import { ReactComponent as Logo } from '../../img/Logo.svg';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-section-1">
          <div className="footer-logo-main"></div>
          <div className="footer-social-icons"></div>
          <a
            href="https://www.google.com/"
            target="_blank"
            className="fa fa-facebook"
          ></a>
          <a
            href="https://www.google.com/"
            target="_blank"
            className="fa fa-instagram"
          ></a>
          <a
            href="https://www.google.com/"
            target="_blank"
            className="fa fa-twitter"
          ></a>
        </div>
        <div className="footer-section-2"></div>
        <div className="footer-section-3"></div>
      </div>
    );
  }
}

export default Footer;

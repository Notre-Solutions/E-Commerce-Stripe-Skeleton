import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'gatsby';
// import { ReactComponent as Logo } from '../../img/Logo.svg';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-section-1">
          <div className="footer-section-1-logo-main">ERAGON</div>
          <div className="footer-section-1-social-icons">
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
        </div>
        <div className="footer-section-2">
          <div className="footer-section-2-column">
            <div className="footer-section-2-title">
              CUSTOMER SERVICE
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.CONTACT_US}>Contact Us</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.ORDERING_DETIALS}>
                Ordering & Payment
              </Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.SHIPPING}>Shipping</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.RETURNS}>Returns</Link>
            </div>
          </div>
          <div className="footer-section-2-column">
            <div className="footer-section-2-title">MEN</div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.MEN_BOOTS}>Boots</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.MEN_WALLETS}>Wallets</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.MEN_DUFFLEBAGS}>DuffleBags</Link>
            </div>
          </div>
          <div className="footer-section-2-column">
            <div className="footer-section-2-title">WOMEN</div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.WOMEN_BOOTS}>Boots</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.WOMEN_WALLETS}>Wallets</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.WOMEN_DUFFLEBAGS}>DuffleBags</Link>
            </div>
          </div>
          <div className="footer-section-2-column">
            <div className="footer-section-2-title">ACCOUNT</div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.SIGN_UP}>Login</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.LOGIN}>Sign Up</Link>
            </div>
            <div className="footer-section-2-link">
              <Link to={ROUTES.CART}>Bag</Link>
            </div>
          </div>
        </div>
        <div className="footer-section-3">
          <div className="footer-section-3-title">
            Subscribe to Eragon via Email
          </div>
          <div className="footer-section-3-subtitle">
            Enter your email bellow to sign up to our newsletter. Dont
            miss a DEAL
          </div>
          <div className="footer-section-3-form">
            <input
              type="text"
              name="email"
              placeholder="Email.."
            ></input>
            <button className="footer-section-3-form-subscribe-button">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;

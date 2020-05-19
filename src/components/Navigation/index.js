import React, { Component } from 'react';
import { Link } from 'gatsby';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import Search from '../Search';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT_DETAILS}>Account Details</Link>
    </li>
    <li>
      <Link to={ROUTES.CART}>Cart</Link>
    </li>

    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

class NavigationNonAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
  }
  toggleSearch() {
    const currentState = this.state.search;
    this.setState({ search: !currentState });
  }

  render() {
    return (
      <>
        <div className="navigation">
          <ul>
            <li className="navigation-left">
              <Link to={ROUTES.WOMENS}>LADIES</Link>
            </li>
            <li className="navigation-left">
              <Link to={ROUTES.MENS}>MENS</Link>
            </li>
            <li className="navigation-left">
              <Link to={ROUTES.CONTACT}>CONTACT</Link>
            </li>
            <li className="navigation-center">
              <Link to={ROUTES.HOME}>ERAGON</Link>
            </li>
            <li className="navigation-right-icons navigation-right-first">
              <i
                className="fa fa-search icon"
                onClick={this.toggleSearch}
              ></i>
            </li>
            <li className="navigation-right-icons navigation-right-second">
              <Link to={ROUTES.SIGN_IN}>
                <i className="fa fa-user icon"></i>
              </Link>
            </li>
            <li className="navigation-right-icons navigation-right-third">
              <Link to={ROUTES.CART}>
                <i className="fa fa-shopping-bag icon"></i>
              </Link>
            </li>
          </ul>
        </div>
        <Search show={this.state.search} toggle={this.toggleSearch} />
      </>
    );
  }
}

export default Navigation;

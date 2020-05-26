import React, { Component } from 'react';
import { CartContext } from '../components/cart';
import Layout from '../components/layout';
import { withFirebase } from '../components/Firebase';
import { AuthUserContext } from '../components/Session';

// TODO: Adding orders not working

/**
 * @file payment-success.js this is the page user is sent to when stripe payment is successful
 * @author Stephen Kelehan and Nyasha Mutangadura
 */

/**
 * Class to empty the cart after the stripe payment is sucessful
 *
 */
class PaymentSuccessSub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userCreated: false,
      fbId: '',
      prevOders: [],
      cart: this.props.context.cartItems,
      auth: this.props.authContext,
    };
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
      this.onListenForUserData();
    }
  };

  componentDidMount() {
    this.firebaseInit();
    if (this.state.auth) {
      console.log('In auth if statment: ' + this.state);
      this.addToPrevOders();
    }
    this.props.context.emptyCart();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onListenForUserData = () => {
    this.setState({ loading: true });
    if (this.state.auth) {
      this.setState({ loading: true });
      this.props.firebase
        .userData()
        .orderByChild('userId')
        .equalTo(this.state.auth.uid)
        .on('child_added', (snapshot) => {
          var fbData = snapshot.val();
          if (fbData) {
            const { prevOders } = fbData;
            this.setState({
              loading: false,
              userCreated: true,
              fbId: snapshot.key,
              prevOders: prevOders ? prevOders : {},
            });
          } else {
            this.setState({ laoding: false });
          }
        });
    }
  };

  onCreateUserData = () => {
    var authUser = JSON.parse(localStorage.getItem('authUser'));
    this.props.firebase.userData().push({
      prevOders: this.state.prevOders,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onEditUserData = () => {
    console.log(this.state);
    this.props.firebase
      .userData()
      .child(this.state.fbId)
      .update({
        prevOders: this.state.prevOders,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
      })
      .then(
        (success) => {
          console.log('success', success);
        },
        (error) => {
          console.log('error', error);
        },
      );
  };

  addOrUpdateUserData = () => {
    if (this.state.userCreated) {
      this.onEditUserData();
    } else {
      this.onCreateUserData();
    }
  };

  removeEmpty = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object')
        this.removeEmpty(obj[key]);
      else if (obj[key] === undefined) {
        obj[key] = '';
      }
    });
    return obj;
  };

  addToPrevOders = () => {
    console.log('In add to Prev: ' + this.state);
    if (this.state.cart !== {}) {
      this.setState({
        prevOders: this.state.prevOders.push(
          this.removeEmpty(this.state.cart),
        ),
      });
      this.addOrUpdateUserData();
    }
  };

  render() {
    return (
      <Layout>
        <div>SUCCESS!!! WOOO</div>
      </Layout>
    );
  }
}

const PaymentSuccess = () => (
  <CartContext.Consumer>
    {(context) => {
      return (
        <AuthUserContext.Consumer>
          {(authContext) => {
            return (
              <PaymentSuccessSub
                context={context}
                authContext={authContext}
              />
            );
          }}
        </AuthUserContext.Consumer>
      );
    }}
  </CartContext.Consumer>
);

export default withFirebase(PaymentSuccess);

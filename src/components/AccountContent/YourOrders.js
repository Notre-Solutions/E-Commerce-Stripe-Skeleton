import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class YourOrders extends Component {
  _initFirebase = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userCreated: false,
      fbId: '',
      prevOders: [],
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
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onListenForUserData = () => {
    this.setState({ loading: true });
    var authUser = JSON.parse(localStorage.getItem('authUser'));
    if (authUser) {
      this.setState({ loading: true });
      this.props.firebase
        .userData()
        .orderByChild('userId')
        .equalTo(authUser.uid)
        .on('child_added', (snapshot) => {
          var fbData = snapshot.val();
          if (fbData) {
            const { prevOders } = fbData;
            this.setState({
              loading: false,
              userCreated: true,
              fbId: snapshot.key,
              prevOders: prevOders ? prevOders : [],
            });
          } else {
            this.setState({ laoding: false });
          }
        });
    }
  };

  componentWillUnmount() {
    this.props.firebase.userData().off();
  }

  render() {
    if (this.state.prevOders.length > 0) {
      return (
        <>
          {this.state.prevOders.map((order) => {
            return (
              <img
                src={order.image}
                alt="Product Image"
                className="cart-items-img"
              />
            );
          })}
        </>
      );
    } else {
      return <>You currently have no Previous Orders</>;
    }
  }
}

export default withFirebase(YourOrders);

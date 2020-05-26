import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'gatsby';

class FavouritesBtns extends Component {
  _initFirebase = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userCreated: false,
      fbId: '',
      fav: {},
    };

    this.addToFav = this.addToFav.bind(this);
    this.removeFromFav = this.removeFromFav.bind(this);
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
            const { fav } = fbData;
            this.setState({
              loading: false,
              userCreated: true,
              fbId: snapshot.key,
              fav: fav ? fav : {},
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

  onCreateUserData = () => {
    var authUser = JSON.parse(localStorage.getItem('authUser'));
    this.props.firebase.userData().push({
      fav: this.state.fav,
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
        fav: this.state.fav,
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

  removeFromFav = (skuId) => {
    var currentFavItems = this.state.fav;
    if (currentFavItems[skuId]) {
      delete currentFavItems[skuId];
      this.setState(() => ({
        fav: currentFavItems,
      }));

      this.addOrUpdateUserData();
    } else {
      throw new Error('Item not in fav');
    }
  };

  addToFav = (skuId, price, desc, img, productId, name) => {
    var currentFavItems = this.state.fav;
    if (currentFavItems[skuId]) {
      return;
    }
    var fav = {
      price: price ? price : '',
      skuId: skuId ? skuId : '',
      desc: desc ? desc : '',
      img: img ? img : '',
      productId: productId ? productId : '',
      name: name ? name : '',
    };
    currentFavItems[skuId] = fav;

    this.setState({
      fav: currentFavItems,
    });

    this.addOrUpdateUserData();
  };

  render() {
    if (JSON.parse(localStorage.getItem('authUser'))) {
      if (this.props.remove) {
        return (
          <>
            <button
              className="Favourites-btn"
              onClick={(e) => this.removeFromFav(this.props.skuId)}
            >
              Remove from Favourites
            </button>
          </>
        );
      } else {
        const product = this.props.product.node;
        return (
          <>
            <button
              className="Favourites-btn"
              onClick={(e) =>
                this.addToFav(
                  product.id,
                  product.price,
                  product.desc,
                  product.image,
                  product.prodId,
                  product.name,
                )
              }
            >
              Add To Favourites
            </button>
          </>
        );
      }
    } else {
      return <></>;
    }
  }
}

class Favourites extends Component {
  _initFirebase = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userCreated: false,
      fbId: '',
      fav: {},
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
            const { fav } = fbData;
            this.setState({
              loading: false,
              fav: fav ? fav : {},
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
    const { loading, fav } = this.state;
    var favArray = [];
    Object.keys(fav).forEach(function (key) {
      var product = {};
      product.id = key;
      product.price = fav[key].price;
      favArray.push(product);
      product.image = fav[key].img;
      product.name = fav[key].name;
      product.desc = fav[key].desc;
      product.prodId = fav[key].productId;
    });
    return (
      <>
        {loading && <div>Loading ...</div>}
        <div className="favourites">
          {favArray.map((item) => {
            return (
              <Link to={'/' + item.prodId}>
                <img
                  src={item.image}
                  alt="Product Image"
                  className="favourites-img"
                />
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}

const FavouritesBtnExp = withFirebase(FavouritesBtns);

export { FavouritesBtnExp };
export default withFirebase(Favourites);

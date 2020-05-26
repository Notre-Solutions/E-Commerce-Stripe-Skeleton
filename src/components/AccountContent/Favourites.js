import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'gatsby';

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
              fav: fav ? fav : {},
              fbId: snapshot.key,
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

  removeFromFav = (item) => {
    var skuId = item.id;
    var currentFavItems = this.state.fav;
    console.log(currentFavItems);
    console.log(skuId);
    if (currentFavItems[skuId]) {
      delete currentFavItems[skuId];
      this.setState(() => ({
        fav: currentFavItems,
      }));

      this.addOrUpdateUserData();
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
    const { loading, fav } = this.state;
    if (this.props.list) {
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
                <div key={item.key} className="favourites-items">
                  <Link to={'/' + item.prodId}>
                    <img
                      src={item.image}
                      alt="Product Image"
                      className="favourites-items-img"
                    />
                  </Link>
                  <div className="favourites-items-name">
                    {item.name}
                    <div className="favourites-items-name-desc">
                      {item.desc}
                    </div>
                  </div>
                  <div className="favourites-items-price">
                    PRICE
                    <div className="favourites-items-price-value">
                      £ {item.price / 100}
                    </div>
                  </div>
                  <div
                    className="favourites-btn-remove fa fa-trash-alt"
                    onClick={(e) => this.removeFromFav(item)}
                  ></div>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      if (JSON.parse(localStorage.getItem('authUser'))) {
        const product = this.props.product.node;
        return (
          <>
            <div
              className="favourites-btn-add"
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
            </div>
          </>
        );
      } else {
        return <></>;
      }
    }
  }
}

export default withFirebase(Favourites);

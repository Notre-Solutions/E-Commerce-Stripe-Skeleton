import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import {
  CountryDropdown,
  RegionDropdown,
} from 'react-country-region-selector';
import { Tabs } from '@yazanaabed/react-tabs';
import PasswordChangeForm from '../PasswordChange';

/**
 * @class
 */

class UpdateUserDetials extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      postCode: '',
      line1: '',
      line2: '',
      line3: '',
      country: '',
      region: '',
      sex: '',
      loading: false,
      userCreated: false,
      fbId: '',
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
            const {
              postCode,
              line1,
              line2,
              line3,
              country,
              region,
              sex,
            } = fbData;
            this.setState({
              postCode,
              line1,
              line2,
              line3,
              country,
              region,
              sex,
              loading: false,
              userCreated: true,
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

  onCreateUserData = (authUser) => {
    this.props.firebase.userData().push({
      postCode: this.state.postCode,
      line1: this.state.line1,
      line2: this.state.line2,
      line3: this.state.line3,
      country: this.state.country,
      region: this.state.region,
      sex: this.state.sex,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  getCurrentUserData() {
    const {
      postCode,
      line1,
      line2,
      line3,
      country,
      region,
      sex,
    } = this.state;
    return { postCode, line1, line2, line3, country, region, sex };
  }

  addOrUpdateUserData = (event, authUser) => {
    if (this.state.userCreated) {
      this.onEditUserData();
    } else {
      this.onCreateUserData(authUser);
    }
    event.preventDefault();
  };

  onEditUserData = () => {
    this.props.firebase
      .userData()
      .child(this.state.fbId)
      .update({
        postCode: this.state.postCode,
        line1: this.state.line1,
        line2: this.state.line2,
        line3: this.state.line3,
        country: this.state.country,
        region: this.state.region,
        sex: this.state.sex,
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

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  currentUserData(authUser) {
    var currentUser = this.getCurrentUserData();
    if (this.state.userCreated) {
      return (
        <div className="userDetails">
          <h1>User Detials</h1>
          <h2>Address</h2>
          <div>Address line one: {currentUser.line1}</div>
          <div>Address line two: {currentUser.line2}</div>
          <div>Address line three: {currentUser.line3}</div>
          <div>Postcode: {currentUser.postcode}</div>
          <div>County: {currentUser.country}</div>
          <div>Cuntry: {currentUser.region}</div>
          <div className="line"></div>
          <h2>User Name</h2>
          <div>{authUser.username}</div>
          <div className="line"></div>
          <h2>User Email</h2>
          <div>{authUser.email}</div>
          <div className="line"></div>
          <h2>Sex</h2>
          <div>{currentUser.sex}</div>
          <div className="line"></div>
        </div>
      );
    } else {
      return (
        <>
          <h1>User Detials</h1>
          <h3>No data given</h3>
        </>
      );
    }
  }

  currentUserFrom(authUser) {
    const {
      postCode,
      line1,
      line2,
      line3,
      country,
      region,
      sex,
    } = this.state;
    return (
      <>
        <div className="updateUserDetails">
          <div>
            <CountryDropdown
              value={country}
              onChange={(val) => this.selectCountry(val)}
            />
          </div>
          <div>
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => this.selectRegion(val)}
            />
          </div>
          <form
            onSubmit={(event) =>
              this.addOrUpdateUserData(event, authUser)
            }
          >
            <h2>Address</h2>
            <div>
              <label>
                <div>Address line one:</div>
                <input
                  type="text"
                  placeholder="Address line one"
                  value={line1}
                  name="line1"
                  onChange={this.myChangeHandler}
                />
              </label>
            </div>
            <div>
              <label>
                <div>Address line two:</div>
                <input
                  placeholder="Address line two"
                  type="text"
                  name="line2"
                  value={line2}
                  onChange={this.myChangeHandler}
                />
              </label>
            </div>
            <div>
              <label>
                <div>Address line three:</div>
                <input
                  placeholder="Address line three"
                  type="text"
                  name="line3"
                  value={line3}
                  onChange={this.myChangeHandler}
                />
              </label>
            </div>
            <div>
              <label>
                <div>PostCode:</div>
                <input
                  placeholder="PostCode"
                  type="text"
                  name="postCode"
                  value={postCode}
                  onChange={this.myChangeHandler}
                />
              </label>
            </div>
            <div>
              <label>
                <div>Sex:</div>
                <input
                  placeholder="Sex"
                  type="text"
                  name="sex"
                  value={sex}
                  onChange={this.myChangeHandler}
                />
              </label>
            </div>
            <button
              type="submit"
              className="updateUserDetails-submit-btn"
            >
              Update
            </button>
          </form>
          <PasswordChangeForm />
        </div>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="UpdateYourDetails">
            <Tabs
              activeTab={{
                id: 'tab1',
              }}
            >
              <Tabs.Tab
                id="tab1"
                title="User Detials"
                style={{ color: 'black' }}
              >
                <div style={{ padding: 10 }}>
                  {loading && <div>Loading ...</div>}
                  {this.currentUserData(authUser)}
                  {!this.state.userCreated && (
                    <div>You currently have no user Data</div>
                  )}
                </div>
              </Tabs.Tab>
              <Tabs.Tab id="tab2" title="Update User Detials">
                <div style={{ padding: 10 }}>
                  <h1>Update User Detials</h1>
                  {this.currentUserFrom(authUser)}
                </div>
              </Tabs.Tab>
            </Tabs>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(UpdateUserDetials);

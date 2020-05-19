import React, { Component } from 'react';

const searchTerms = [
  'Siri',
  'Alexa',
  'Google',
  'Facebook',
  'Twitter',
  'Linkedin',
  'Sinkedin',
];

// only ever show 5 results
function showSearchResults(items) {
  if (items.length > 0) {
    return (
      <div className="results">
        <lu className="result-list">
          {items.slice(0, 5).map((item) => {
            return <li className="result-list-item">{item}</li>;
          })}
        </lu>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initalItems: searchTerms,
      items: [],
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener(
      'mousedown',
      this.handleClickOutside,
    );
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ items: [] });
      this.props.toggle();
    }
  }

  handleOnInputChange = (event) => {
    if (event.target.value === '') {
      this.setState({ items: [] });
    } else {
      var updatedList = this.state.initalItems;
      updatedList = updatedList.filter(function (item) {
        return (
          item
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
        );
      });
      this.setState({ items: updatedList });
    }
  };

  render() {
    if (!this.props.show) {
      return <></>;
    } else {
      return (
        <div className="search" ref={this.setWrapperRef}>
          <input
            type="text"
            name="search"
            placeholder="Search.."
            onChange={this.handleOnInputChange}
          ></input>
          {showSearchResults(this.state.items)}
        </div>
      );
    }
  }
}

export default Search;

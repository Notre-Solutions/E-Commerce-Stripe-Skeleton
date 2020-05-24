import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import React, { Component } from 'react';

class ThumnailCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      slides: this.props.slides,
      thumbnails: this.props.slides,
    };
    this.onchange = this.onchange.bind(this);
  }

  onchange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <Carousel
          value={this.state.value}
          slides={this.state.slides}
          onChange={this.onchange}
        />
        <Dots
          number={this.state.thumbnails.length}
          thumbnails={this.state.thumbnails}
          value={this.state.value}
          onChange={this.onchange}
          number={this.state.slides.length}
        />
      </div>
    );
  }
}

export default ThumnailCarousel;

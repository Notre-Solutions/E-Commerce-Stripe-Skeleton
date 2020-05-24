import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import JoinPictureBtn from './JoinPictureBtn';

function CarouselImages(data) {
  var array = [];
  data.forEach((slide, i) => {
    var slide2 = {
      image: slide.imageTwo.childImageSharp.fluid,
      link: slide.link,
    };
    array.push(
      <>
        <Img
          fluid={slide.imageOne.childImageSharp.fluid}
          objectFit="cover"
          className="homePage-section-2-img"
        />
      </>,
    );
    array.push(<JoinPictureBtn data={slide2} />);
  });
  return array;
}

class CarouselTwoSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || [],
    };
  }
  render() {
    return (
      <Carousel
        slidesPerScroll={2}
        slidesPerPage={2}
        infinite
        arrows
        // autoPlay={12000}
        // animationSpeed={4000}
        arrowLeft={<i className="fa fa-chevron-left fa-3x hover"></i>}
        arrowRight={
          <i className="fa fa-chevron-right fa-3x hover"></i>
        }
        addArrowClickHandler
      >
        {CarouselImages(this.state.data)}
      </Carousel>
    );
  }
}

export default CarouselTwoSlider;

import Img from 'gatsby-image';
import React from 'react';
import { Link } from 'gatsby';

const JoinPictureBtn = ({ data }) => {
  const { image, link } = data;
  console.log(data);

  return (
    <div className="JoinPictureBtn">
      <Img
        fluid={image}
        objectFit="cover"
        className="JoinPictureBtn-img"
      />
      <Link to={link} className="JoinPictureBtn-btn">
        BUY NOW
      </Link>
    </div>
  );
};

export default JoinPictureBtn;

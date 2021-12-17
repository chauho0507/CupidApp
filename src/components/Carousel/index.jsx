import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bgImage from '../../assets/img/banner_bg.jpg';

const ImageCarousel = ({ images }) => {
  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };
  return (
    <div>
      <Slider {...settings}>
        {/* {images.map(item => (
          <div key={item.id}>
            <img src={item.src} alt={item.alt} />
          </div>
        ))} */}
        <div>
          <img src={bgImage} alt="img" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;

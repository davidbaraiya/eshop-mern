import Slider from "react-slick";
import { RightArrowIcon } from "../assets/icons/icons";
import { useEffect, useRef, useState } from "react";

function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <RightArrowIcon color="#fff" />
    </div>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <RightArrowIcon color="#fff" />
    </div>
  );
}

const ProductCarousel = ({ images = [], name }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container">
      <Slider
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
        nextArrow=<NextArrow />
        prevArrow=<PrevArrow />
        infinite={false}
        className="product-main-slider"
      >
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        infinite={false}
        className="product-thumb-slider"
      >
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
        <div className="img-wrapper">
          <img src={images[0]?.url} alt="product img" />
        </div>
      </Slider>
    </div>
  );
};

export default ProductCarousel;

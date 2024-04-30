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
        infinite={true}
        className="product-main-slider"
      >
        {images?.map((image) => (
          <div className="img-wrapper" key={image.public_id}>
            <img src={image.url} alt="product img" />
          </div>
        ))}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={false}
        focusOnSelect={true}
        arrows={false}
        infinite={true}
        className="product-thumb-slider"
      >
        {images?.map((image) => (
          <div className="img-wrapper" key={image.public_id}>
            <img src={image.url} alt="product img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;

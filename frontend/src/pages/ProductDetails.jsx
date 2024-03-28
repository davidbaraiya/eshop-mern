import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import img1 from "../assets/images/banner.png";
import img2 from "../assets/images/banner-2.png";
import { RightArrowIcon } from "../assets/icons/icons";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { Rating } from "@mui/material";
import { Star, Add, Remove } from '@mui/icons-material';
import Breadcrumb from "../components/Breadcrumb";
import Section2 from "./home/Section2";


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

const ProductDetails = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
      <section className="product-detail bg-theme pt">
        <div className="container">
          <Breadcrumb color="#fff" currentPage="Product Detail" />
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white relative text-black p-5 before:bg-white before:absolute before:inset-y-0 before:-left-[50vw] before:w-[50vw]">
              <div className="slider-container">
                <Slider
                  asNavFor={nav2}
                  ref={(slider) => (sliderRef1 = slider)}
                  nextArrow=<NextArrow />
                  prevArrow=<PrevArrow />
                >
                  <div className="img-wrapper">
                    <img src={img1} alt="product img" />
                  </div>
                  <div className="img-wrapper">
                    <img src={img2} alt="product img" />
                  </div>
                  <div className="img-wrapper">
                    <img src={img1} alt="product img" />
                  </div>
                  <div className="img-wrapper">
                    <img src={img2} alt="product img" />
                  </div>
                </Slider>
                <Slider
                  asNavFor={nav1}
                  ref={(slider) => (sliderRef2 = slider)}
                  slidesToShow={4}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  arrows={false}
                >
                  <div className="img-wrapper">
                    <img src={img1} alt="product img" />
                  </div>
                  <div className="img-wrapper">
                    <img src={img2} alt="product img" />
                  </div>
                  <div className="img-wrapper">
                    <img src={img1} alt="product img" />
                  </div>
                  <div className="img-wrapper">
                    <img src={img2} alt="product img" />
                  </div>
                </Slider>
              </div>
            </div>
            <div className=" p-5">
              <div className="product-details text-white">
                <Button className="btn-white mb-3 text-xs" backButton={true}>Go To Back</Button>
                <Heading>
                  <h3>Knee Length Dress in Tropical Leaves Cotton</h3>
                </Heading>
                <div className="rating flex items-center gap-2 mb-2">
                  <Rating
                    name="rating"
                    defaultValue={4}
                    readOnly
                    sx={{ width: "100px" }}
                    emptyIcon={<Star style={{ opacity: 0.55, color: "#fff" }} />}
                  />
                  <span style={{ lineHeight: 1 }} className="text-xs">
                    (51)
                  </span>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
                </p>

                <div className="quantity mt-4">
                  <label htmlFor="quantity" className="block">Quantity:</label>
                  <div className="inline-flex mt-2 min-w-fit">
                    <Button showIcon={false} className="btn-white"> <Remove fontSize="md" /></Button>
                    <div className="flex items-center px-3 border-t border-b">5</div>
                    <Button showIcon={false} className="btn-white"><Add fontSize="md" /></Button>
                  </div>
                </div>
                <div className="font-bold  flex-shrink-0 w-full my-4 text-xl">&#8377; 450</div>
                <Button className="btn-white w-full">Add To Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt pb">
        <div className="container">
          <Section2 />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

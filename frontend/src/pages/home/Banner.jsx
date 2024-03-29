import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import banner1 from "../../assets/images/banner.png";
import banner2 from "../../assets/images/banner-2.png";
import { Button } from "../../components";

const Banner = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="hero-section relative">
      <Slider {...settings}>
        <div>
          <div className="relative text-white md:min-h-[550px] min-h-[300px] flex items-center ">
            <div className="absolute inset-0 ">
              <img src={banner1} alt="banner img" loading="lazy" />
            </div>
            <div className="relative max-w-[550px] px-5 py-14 ">
              <h2 className="">
                <span>Modern </span> and <span>timeless clothes </span> from the
                best stylists.
              </h2>
              <Button className="btn-white mt-4">go to shop</Button>
            </div>
          </div>
        </div>
        <div>
          <div className="relative text-white md:min-h-[550px] min-h-[300px] flex items-center ">
            <div className="absolute inset-0 ">
              <img src={banner2} alt="banner img" loading="lazy" />
            </div>
            <div className="relative max-w-[550px] px-5 py-14 ">
              <h2 className="">
                Women <span> White Sports</span> Shorts
              </h2>
              <Button className="btn-white mt-4">go to shop</Button>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Banner;

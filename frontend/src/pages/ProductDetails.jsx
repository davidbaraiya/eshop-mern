import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import Breadcrumb from "../components/Breadcrumb";
import Section2 from "./home/Section2";
import ReviewModal from "../components/ReviewModal";
import ReviewCard from "../components/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import ProductCarousel from "../components/ProductCarousel";
import { addToCartAction } from "../redux/actions/cartAction";
import Quantity from "../components/Quantity";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const {
    success,
    loading: reviewLoading,
    error: reviewError,
  } = useSelector((state) => state.productReviews);

  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  const {
    ratings,
    name,
    description,
    price,
    rating,
    images,
    category,
    stock,
    numOfReviews,
    reviews,
  } = singleProduct || {};

  const handleAddToCart = () => {
    dispatch(addToCartAction(productId, quantity));
  };

  if (loading || reviewLoading) {
    return <Loader />;
  }
  if (error || reviewError) {
    toast.error("Error :", error);
  }
  if (success) {
    return toast.success("review added");
  }

  return (
    <>
      <section className="product-detail-section bg-theme">
        <Breadcrumb color="#fff" currentPage="Product Detail" />
        <div className="container">
          <div className="md:grid md:grid-cols-2 gap-5">
            <div className="bg-white relative text-black p-3 ms:p-5 before:bg-white before:absolute before:inset-y-0 before:-left-[50vw] before:w-[50vw]">
              <ProductCarousel {...{ images, name }} />
            </div>
            <div className="px-2 py-4 md:p-5">
              <div className="product-details text-white">
                <h3 className="capitalize text-2xl mb-4">{name}</h3>
                <div className="rating flex items-center gap-2 mb-2">
                  <Rating
                    name="half-rating"
                    defaultValue={ratings ?? 0}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <Star style={{ opacity: 0.55, color: "#fff" }} />
                    }
                  />
                  <span style={{ lineHeight: 1 }} className="text-xs">
                    ({numOfReviews} reviews)
                  </span>
                </div>
                <p>{description}</p>
                <div className="mt-4 flex gap-3 items-center">
                  <label htmlFor="status" className="block">
                    Status:
                  </label>
                  {stock >= 1 ? (
                    <div id="status" className="text-green-400 ">
                      In Stock
                    </div>
                  ) : (
                    <div id="status" className="text-red ">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="quantity mt-4">
                  <label htmlFor="quantity" className="block">
                    Quantity:
                  </label>
                  <Quantity {...{ quantity, setQuantity, stock }} />
                </div>
                <div className="font-bold  flex-shrink-0 w-full my-4 text-xl">
                  &#8377; {price}
                </div>
                <div className="flex gap-5 w-full">
                  <Button
                    className="btn-white flex-1"
                    showIcon={false}
                    onClick={handleOpenModal}
                  >
                    Submit Review
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    className="btn-white flex-1"
                    disabled={stock < 1 ? true : false}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReviewModal {...{ openModal, handleCloseModal, productId }} />
      <section className="pt pb bg-gray mt-[40px] md:mt-[80px]">
        <div className="container">
          <Heading className="text-center">
            <h2 title="true">
              <span>Reviews</span>
            </h2>
          </Heading>
          {reviews?.length > 0 ? (
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {reviews.map((review) => (
                <ReviewCard review={review} key={review._id} />
              ))}
            </div>
          ) : (
            <div className="my-5 text-lg text-center">No Reviews Yet</div>
          )}
        </div>
      </section>
      <Section2 />
    </>
  );
};

export default ProductDetails;

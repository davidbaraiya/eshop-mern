import React, { useEffect } from "react";
import { Button, ProductCard } from "../../components";
import { getAllProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/Heading";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const Section2 = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log("Error:", error);
    const errorMessage = error || "An error occurred";
    toast.error(errorMessage);
    return null;
  }

  return (
    <section className="pt pb">
      <div className="container">
        <div className="">
          <Heading className="flex justify-between items-center gap-3">
            <h2 title="true">
              Shop <span>Our Products</span>
            </h2>
            <Button as="Link" to="/products">
              View All
            </Button>
          </Heading>
          {allProducts?.length > 0 && (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-3">
              {allProducts?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section2;

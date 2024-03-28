import React, { useEffect } from "react";
import { Button, ProductCard } from "../../components";
import { getAllProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/Heading";

const Section2 = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading, isError } = useSelector(
    (state) => state.products.allProducts
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

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
          {allProducts?.products?.length > 0 && (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-3">
              {allProducts?.products?.map((product) => (
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

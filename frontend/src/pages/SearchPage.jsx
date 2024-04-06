import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";
import Loader from "../components/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productAction";
import { ProductCard } from "../components";
import Pagination from "../components/Pagination";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const {
    allProducts,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("keyword") || ""
  );
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);

  const handleSearch = () => {
    navigate(`?keyword=${searchQuery}`);
    setPage(1);
    submitSearch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    const queryString = searchQuery
      ? `?keyword=${searchQuery}&page=${newPage}`
      : `?page=${newPage}`;
    navigate(queryString);
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const submitSearch = () => {
    dispatch(getAllProducts({ searchQuery, page }));
  };

  useEffect(() => {
    submitSearch();
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    toast.error("Error :", error);
  }

  const totalProducts = Math.ceil(productsCount / resultPerPage);

  return (
    <section className="pb bg-gray">
      <Breadcrumb currentPage={"Search"} />
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span>Search</span>
          </h2>
        </Heading>
        <form onSubmit={handleSubmit}>
          <div className="flex max-w-[50%] mx-auto">
            <input
              type="text"
              className="p-2 border focus:outline-none focus:border-2 w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyDown={handleEnterSubmit}
            />
            <Button className="btn-fill" type="submit">
              Search
            </Button>
          </div>
        </form>
        {allProducts?.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-3 mt-[50px]">
            {allProducts?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-xl">No Product Found</div>
        )}
        {resultPerPage < productsCount && (
          <Pagination
            count={totalProducts}
            page={page}
            handleChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default SearchPage;

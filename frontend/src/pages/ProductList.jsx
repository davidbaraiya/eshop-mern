import Heading from "../components/Heading";
import { ProductCard } from "../components";
import Breadcrumb from "../components/Breadcrumb";
import RangeSlider from "../components/RangeSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductCategories,
} from "../redux/actions/productAction";
import { GridViewRounded, ViewStreamRounded } from "@mui/icons-material";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import Pagination from "../components/Pagination";

const ProductList = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { productCategories } = useSelector((state) => state.productCategories);

  const [category, setCategory] = useState("");
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([10, 50000]);
  const [rating, setRating] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllProducts({ category, priceRange, rating }));
  }, [dispatch, category, priceRange, rating]);

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  if (error) {
    toast.error("Error :", error);
  }
  const totalProducts = Math.ceil(productsCount / resultPerPage);

  return (
    <section className="pb bg-gray">
      <Breadcrumb currentPage={"Cart"} />
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span>Products</span>
          </h2>
        </Heading>
        <div className="block gap-5 items-start w-full md:flex">
          <div className=" bg-white border border-gray max-w-[100%]  w-full shadow-md py-5 px-4 md:max-w-[280px]">
            <h4>Filter</h4>
            <hr className="my-3 border-slate-400" />
            {productCategories?.length > 0 && (
              <div>
                <h6 className="mb-3">Category</h6>
                <ul className="mt-2 capitalize">
                  {productCategories?.map((category) => (
                    <li key={category} className="flex gap-3 items-center mb-1">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        value={category}
                        onChange={() => setCategory(category)}
                      />
                      <label htmlFor={category}>{category}</label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="my-4 border-slate-400" />
            <h6 className="mb-3 flex">
              Price Range{" "}
              <span className="font-sans ml-auto">
                &#8377; ( {priceRange[0]} - {priceRange[1]} )
              </span>
            </h6>
            <RangeSlider
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
            <hr className="my-3 border-slate-400" />
            <h6 className="mb-3">Rating</h6>
            <ul className="">
              {new Array(5).fill("rating").map((rating, i) => (
                <li key={i} className="flex gap-3 items-center mb-1">
                  <input
                    type="radio"
                    id={rating + i}
                    name="rating"
                    value={i + 1}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <label htmlFor={rating + i} className="w-full">
                    <Rating
                      name="rating"
                      defaultValue={i + 1}
                      readOnly
                      sx={{ width: "100px" }}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray w-full shadow-md py-5 px-4">
            <div className="mb-5 flex justify-between items-center gap-3 border-b border-darkGray pb-2">
              <div className="flex gap-3">
                <button>
                  <GridViewRounded sx={{ color: "#2D626C" }} />
                </button>
                <button>
                  <ViewStreamRounded sx={{ color: "#2D626C" }} />
                </button>
              </div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="selectSort">Sort</InputLabel>
                <Select
                  labelId="selectSort"
                  id="select"
                  value={select}
                  label="Sort"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            {allProducts?.length > 0 && (
              <div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3">
                  {allProducts?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
                <Pagination
                  count={totalProducts}
                  page={page}
                  handleChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;

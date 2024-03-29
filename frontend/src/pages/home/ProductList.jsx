import Heading from "../../components/Heading";
import { Button, ProductCard } from "../../components";
import Breadcrumb from "../../components/Breadcrumb";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import RangeSlider from "../../components/RangeSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../redux/actions/productAction";
import { GridViewRounded, ViewStreamRounded } from "@mui/icons-material";

const ProductList = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading, isError } = useSelector(
    (state) => state.products.allProducts
  );
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <section className="pb bg-gray">
      <div className="bg-theme py-10 mb-[80px]">
        <div className="container">
          <Button backButton={true} className="mb-3 btn-white">
            Go To Back
          </Button>
          <Breadcrumb currentPage={"Cart"} className="mb-0" />
        </div>
      </div>
      <div className="container">
        <Heading>
          <h2 title="true">Products</h2>
        </Heading>
        <div className="flex gap-5 items-start w-full">
          <div className="bg-white border border-gray max-w-[280px] w-full shadow-md py-5 px-4">
            <h4>Filter</h4>
            <hr className="my-3 border-slate-400" />
            <div>
              <h6 className="mb-3">Category</h6>
              <ul className="mt-2 capitalize">
                <li className="flex gap-3 items-center mb-1">
                  <input type="radio" id="men" name="category" />
                  <label htmlFor="men">men</label>
                </li>
                <li className="flex gap-3 items-center mb-1">
                  <input type="radio" id="women" name="category" />
                  <label htmlFor="women">women</label>
                </li>
                <li className="flex gap-3 items-center mb-1">
                  <input type="radio" id="kid" name="category" />
                  <label htmlFor="kid">kid</label>
                </li>
                <li className="flex gap-3 items-center mb-1">
                  <input type="radio" id="electronic" name="category" />
                  <label htmlFor="electronic">electronic</label>
                </li>
              </ul>
            </div>
            <hr className="my-4 border-slate-400" />
            <h6 className="mb-3 flex">
              Price Range{" "}
              <span className="font-sans ml-auto">&#8377; ( 45-68 )</span>
            </h6>
            <RangeSlider />
            <hr className="my-3 border-slate-400" />
            <h6 className="mb-3">Rating</h6>
            <ul className="">
              <li className="flex gap-3 items-center mb-1">
                <input type="radio" id="star1" name="rating" />
                <label htmlFor="star1">
                  <Rating
                    name="rating"
                    defaultValue={1}
                    readOnly
                    sx={{ width: "100px" }}
                  />
                </label>
              </li>
              <li className="flex gap-3 items-center mb-1">
                <input type="radio" id="star2" name="rating" />
                <label htmlFor="star2">
                  <Rating
                    name="rating"
                    defaultValue={2}
                    readOnly
                    sx={{ width: "100px" }}
                  />
                </label>
              </li>
              <li className="flex gap-3 items-center mb-1">
                <input type="radio" id="star3" name="rating" />
                <label htmlFor="star3">
                  <Rating
                    name="rating"
                    defaultValue={3}
                    readOnly
                    sx={{ width: "100px" }}
                  />
                </label>
              </li>
              <li className="flex gap-3 items-center mb-1">
                <input type="radio" id="star4" name="rating" />
                <label htmlFor="star4">
                  <Rating
                    name="rating"
                    defaultValue={4}
                    readOnly
                    sx={{ width: "100px" }}
                  />
                </label>
              </li>
              <li className="flex gap-3 items-center mb-1">
                <input type="radio" id="star5" name="rating" />
                <label htmlFor="star5">
                  <Rating
                    name="rating"
                    defaultValue={5}
                    readOnly
                    sx={{ width: "100px" }}
                  />
                </label>
              </li>
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
                <InputLabel id="demo-select-small-label">Sort by</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Age"
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
            {allProducts?.products?.length > 0 && (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-3">
                {allProducts?.products?.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;

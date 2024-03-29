import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card shadow-lg border-darkGray border hover:-translate-y-2 transition-all hover:border-b-theme border-b-2">
      <Link
        to={`/product-details/${product._id}`}
        className="relative w-full pt-[80%] bg-[whitesmoke]"
      >
        <img
          src="https://themes.workdo.io/html/style/assets/images/best-pro1.png"
          alt="product img"
          className="absolute inset-0 object-contain h-full w-full"
        />
      </Link>
      <div className="content px-3 py-4">
        <h5>
          <Link to={`/product-details/${product._id}`}>{product.name}</Link>
        </h5>
        <div className="rating flex items-center gap-2 my-2">
          <Rating
            name="rating"
            defaultValue={product.rating}
            readOnly
            sx={{ width: "100px" }}
          />
          <span style={{ lineHeight: 1 }} className="text-xs">
            ({product?.numOfReviews})
          </span>
        </div>
        <div className="font-bold text-lg">&#8377; {product.price}</div>
        <Button fontSize={12} className="mt-3">
          add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

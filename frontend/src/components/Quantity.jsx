import Button from "./Button";
import { Add, Remove } from "@mui/icons-material";

const Quantity = ({ quantity, setQuantity, stock }) => {
  const handleQuantityINCR = () => {
    let qnty = stock > quantity ? quantity + 1 : stock;
    setQuantity(qnty);
  };

  const handleQuantityDECR = () => {
    setQuantity((prev) => (prev !== 1 ? prev - 1 : 1));
  };

  return (
    <div className="inline-flex mt-2 min-w-fit">
      <Button
        showIcon={false}
        onClick={handleQuantityDECR}
        className="btn-white"
      >
        <Remove fontSize="md" />
      </Button>
      <div className="flex items-center justify-center px-1 border-t border-b w-[45px]">
        {quantity}
      </div>
      <Button
        showIcon={false}
        onClick={handleQuantityINCR}
        className="btn-white"
      >
        <Add fontSize="md" />
      </Button>
    </div>
  );
};

export default Quantity;

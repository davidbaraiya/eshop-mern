import { useState } from "react";
import { Rating } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./Button";
import { addProductReview } from "../redux/actions/productAction";
import { useDispatch } from "react-redux";

const ReviewModal = ({ openModal, handleCloseModal, productId }) => {
  const dispatch = useDispatch();

  const [rateValue, setRateValue] = useState(4);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductReview({ rateValue, message, productId }));
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add Review</DialogTitle>
        <form action="" onSubmit={handleSubmit}>
          <DialogContent>
            <div className="mb-3">
              <Rating
                name="rateValue"
                value={rateValue}
                sx={{ width: "120px" }}
                onChange={(event, newValue) => {
                  setRateValue(newValue);
                }}
              />
            </div>
            <textarea
              name="message"
              cols="30"
              rows="5"
              className="form-control"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </DialogContent>
          <div
            style={{ padding: "0 20px 20px 20px" }}
            className="flex gap-2 justify-end"
          >
            <Button onClick={handleCloseModal} showIcon={false}>
              Cancel
            </Button>
            <Button onClick={handleCloseModal} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default ReviewModal;

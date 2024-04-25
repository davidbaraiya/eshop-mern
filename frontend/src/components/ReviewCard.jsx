import { Rating } from "@mui/material";
import dummyUser from "../assets/images/dummy-user.png";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card border-theme border py-5 px-3 bg-white">
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] rounded-full bg-theme flex-shrink-0">
          <img src={dummyUser} alt="user profile" className="w-full h-full" />
        </div>
        <div className="">
          <h6 className="capitalize">{review.name} </h6>
          <Rating
            name="rating"
            defaultValue={review.rating}
            precision={0.5}
            readOnly
            size="small"
          />
          <p className="text-slate-500">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

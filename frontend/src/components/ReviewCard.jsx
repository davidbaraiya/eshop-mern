import { Rating } from "@mui/material";
import dummyUser from "../assets/images/dummy-user.png";

const ReviewCard = () => {
  return (
    <div className="review-card border-theme border py-5 px-3 bg-white">
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] rounded-full bg-theme flex-shrink-0">
          <img src={dummyUser} alt="user profile" className="w-full h-full" />
        </div>
        <div className="">
          <h6 className="capitalize"> david baraiya </h6>
          <Rating
            name="rating"
            defaultValue={3}
            readOnly
            sx={{ width: "100px" }}
          />
          <p className="text-slate-500">Lorem ipsum busdam, quos officiis.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

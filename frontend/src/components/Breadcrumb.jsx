import { Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "./Button";

function handleClick(event) {
  event.preventDefault();
}

const Breadcrumb = ({ currentPage, className = " ", color }) => {
  return (
    <div className={`bg-theme py-10 mb-[40px] md:mb-[80px]  ${className}`}>
      <div className="container">
        <Button backButton={true} className="mb-3 btn-white">
          Go To Back
        </Button>
        <div
          role="presentation"
          onClick={handleClick}
          // className={`${className}`}
        >
          <Breadcrumbs aria-label="breadcrumb" color={color}>
            <Link to={"/"}>Home</Link>
            <Typography color={color} sx={{ opacity: "0.5" }}>
              {currentPage}
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

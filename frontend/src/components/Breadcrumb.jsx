import { Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Breadcrumb = ({ currentPage, className = " ", color }) => {
  return (
    <div
      role="presentation"
      onClick={handleClick}
      className={`mb-5 ${className}`}
    >
      <Breadcrumbs aria-label="breadcrumb" color={color}>
        <Link to={"/"}>Home</Link>
        <Typography color={color} sx={{ opacity: "0.5" }}>
          {currentPage}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;

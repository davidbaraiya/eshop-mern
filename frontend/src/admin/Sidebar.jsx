import { logo } from "../utils/constent";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GradingIcon from "@mui/icons-material/Grading";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar w-[250px]  bg-white border border-darkGray shadow-md py-4 px-3">
      <div className="head mb-3 bg-darkGray p-3 rounded-sm">
        <img src={logo} alt="logo" width={80} />
      </div>
      <ul className="capitalize text-slate-600">
        <li className="mb-2">
          <NavLink to="/admin/dashboard" className="w-full bg-gray p-2 ">
            <DashboardIcon />
            <span className="ms-2">dashboard</span>
          </NavLink>
        </li>
        {/* <li className="mb-2">
          <NavLink to="/admin/products" className="w-full bg-gray p-2 ">
            <DashboardIcon />
            <span className="ms-2">products</span>
          </NavLink>
        </li> */}
        <li className="mb-2">
          <div onClick={handleClick} className="flex bg-gray gap-2 p-2">
            <InboxIcon />
            <span>Products</span>
            <span className="ml-auto">
              {open ? <ExpandLess /> : <ExpandMore />}
            </span>
          </div>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <NavLink
              to="/admin/products"
              className="w-full flex items-center ml-auto bg-gray p-2 my-3 text-[13px]"
            >
              <ArrowForwardIosIcon
                sx={{ fontSize: "12px", marginLeft: "20px" }}
              />
              <span className="ms-2"> view products</span>
            </NavLink>
            <NavLink
              to="/admin/product/create"
              className="w-full flex items-center ml-auto bg-gray p-2 my-3 text-[13px]"
            >
              <ArrowForwardIosIcon
                sx={{ fontSize: "12px", marginLeft: "20px" }}
              />
              <span className="ms-2"> Create Products</span>
            </NavLink>
          </Collapse>
        </li>

        <li className="mb-2">
          <NavLink to="/admin/orders" className="w-full bg-gray p-2 ">
            <GradingIcon />
            <span className="ms-2">orders</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/admin/users" className="w-full bg-gray p-2 ">
            <PeopleIcon />
            <span className="ms-2">users</span>
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink to="/admin/reviews" className="w-full bg-gray p-2 ">
            <RateReviewIcon />
            <span className="ms-2">review</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logo, navLinks } from "../utils/constent";
import {
  Search,
  LocalMall,
  AccountCircle,
  Close,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { MobileIcon, SendIcon } from "../assets/icons/icons";
import { Avatar, Drawer, IconButton, Menu, MenuItem } from "@mui/material";
import { logoutAction } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const dropdownMenu = [
  {
    title: "login",
    path: "/auth/login",
  },
  {
    title: "register",
    path: "/auth/register",
  },
];

const LoggedinDropdownMenu = [
  {
    title: "My Profile",
    path: "/my-profile",
  },
  {
    title: "My Orders",
    path: "/my-orders",
  },
];

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setMobileMenuOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <header className="header shadow-sm">
        <div className="md:block hidden announcebar relative bg-theme py-3">
          <div className="container">
            <div className="flex items-center justify-between text-xs">
              <p className="inline-flex gap-2">
                <SendIcon size={16} />
                <b>7 days a week </b>
                from 9:00 am to 7:00 pm
              </p>
              <div className="announcebar-right flex gap-2 items-center">
                <a href="tel:610403403" className="flex gap-2">
                  <span>
                    Call us : <b> 610-403-403</b>
                  </span>
                  <MobileIcon size={16} />
                </a>
                <button className="xl:absolute inset-y-0 right-2">
                  <Close size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="main-navigationbar py-5 shadow-md border-b border-darkGray">
          <div className="container">
            <nav className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to={"/"} className="flex-shrink-0 w-[70px] ">
                  <img src={logo} alt="logo" width={"100%"} />
                </Link>
                <ul className="nav-links hidden md:flex items-center ml-8 gap-4 text-theme">
                  {navLinks?.length > 0 &&
                    navLinks.map(({ title, path }) => {
                      return (
                        <li key={title} className="capitalize">
                          <NavLink to={path}>{title}</NavLink>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <ul className="nav-right capitalize flex items-center ml-5 gap-4 ">
                <li>
                  <Link to="/search">
                    <Search color="" />
                  </Link>
                </li>
                <li className="relative">
                  <Link to="/cart">
                    <LocalMall />
                  </Link>
                  <span className="absolute flex items-center justify-center text-xs w-[16px] h-[16px] rounded-full p-1 bg-red text-white -right-2 -top-2">
                    {cart?.length}
                  </span>
                </li>
                <li>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user?.isLoggedIn ? (
                      <Avatar
                        alt="avatar"
                        src={user?.user?.avatar.url}
                        className="capitalize"
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className="capitalize"
                  >
                    {user?.isLoggedIn && user?.user?.role === "admin" && (
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{ padding: "0" }}
                      >
                        <Link
                          to={"/admin/dashboard"}
                          className="w-full px-4 py-2"
                        >
                          Dashboard
                        </Link>
                      </MenuItem>
                    )}

                    {(user?.isLoggedIn
                      ? LoggedinDropdownMenu
                      : dropdownMenu
                    )?.map((option) => (
                      <MenuItem
                        key={option.title}
                        onClick={handleCloseUserMenu}
                        sx={{ padding: "0" }}
                      >
                        <Link to={option.path} className=" w-full px-4 py-2">
                          {option.title}
                        </Link>
                      </MenuItem>
                    ))}
                    {user?.isLoggedIn && (
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{ padding: "0" }}
                      >
                        <span
                          className=" w-full px-4 py-2 text-red"
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </MenuItem>
                    )}
                  </Menu>
                </li>

                <li className="md:hidden" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Drawer open={mobileMenuOpen} onClose={toggleDrawer(false)} width={500}>
        <div className="bg-theme flex justify-between items-center py-3 px-3 w-[230px]">
          <div className="text-lg">eShop</div>
          <button onClick={toggleDrawer(false)}>
            <Close />
          </button>
        </div>
        <ul className="nav-links-mobile text-base capitalize h-full overflow-y-auto">
          {navLinks?.length > 0 &&
            navLinks.map(({ title, path }) => {
              return (
                <li key={title} onClick={toggleDrawer(false)}>
                  <NavLink to={path} className="px-3 w-full py-2">
                    {title}
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </Drawer>
    </>
  );
};

export default Header;

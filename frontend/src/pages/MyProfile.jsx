import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Heading from "../components/Heading";
import dummyUser from "../assets/images/dummy-user.png";
import { Button } from "../components";
import IconButton from "@mui/material/IconButton";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const MyProfile = () => {
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (user.loading) {
      return <Loader />;
    }
  }, [user.loading]);

  const date = new Date(user?.user?.createdAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}-${month < 10 ? "0" + month : month}-${year}`;

  return (
    <>
      <section className="pb">
        <Breadcrumb currentPage={"My Profile"} />
        <div className="container">
          <Heading>
            <h2 title="true">My Profile</h2>
          </Heading>
          <div className="bg-gray relative">
            <div
              className="absolute  top-5 right-5 bg-darkGray rounded-full p-1"
              onClick={handleOpenModal}
            >
              <IconButton>
                <CreateOutlinedIcon />
              </IconButton>
            </div>

            <div className="flex items-center  py-16 px-6 gap-20 max-w-[75%] mx-auto">
              <div className="img-wrapper w-[150px] h-[150px] border border-darkGray  rounded-full overflow-hidden">
                <img
                  src={user?.user?.avatar.url ?? dummyUser}
                  alt="profile"
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="content capitalize">
                <div className="mb-5 flex items-center text-slate-600">
                  <label htmlFor="name" className="mr-3 text-xl">
                    Name:
                  </label>
                  <span>{user?.user?.name}</span>
                </div>
                <div className="mb-5 flex items-center text-slate-600">
                  <label htmlFor="name" className="mr-3 text-xl">
                    Email:
                  </label>
                  <span className="lowercase">{user?.user?.email}</span>
                </div>
                <div className="mb-5 flex items-center text-slate-600">
                  <label htmlFor="name" className="mr-3 text-xl">
                    Join On:
                  </label>
                  <span>{formattedDate}</span>
                </div>
                <div className="flex gap-5">
                  <Button as={"Link"} showIcon={false} to={"/my-orders"}>
                    My Orders
                  </Button>
                  <Button
                    as={"Link"}
                    showIcon={false}
                    to={"/auth/change-password"}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UpdateProfile {...{ openModal, handleCloseModal }} />
    </>
  );
};

export default MyProfile;

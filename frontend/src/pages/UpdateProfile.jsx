import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "../components";
import { useDispatch, useSelector } from "react-redux";
import dummyAvatar from "../assets/images/dummy-user.png";
import { updateProfile } from "../redux/actions/userAction";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const UpdateProfile = ({ openModal, handleCloseModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, success, error } = useSelector(
    (state) => state.profileUpdate
  );
  const [authData, setAuthData] = useState({
    name: user?.user?.name,
    email: user?.user?.email,
    avatar: user?.user?.avatar.url,
  });

  // handle input change
  const handleAuthInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setAuthData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // submit form
  const submitAuthForm = (e) => {
    e.preventDefault();
    dispatch(updateProfile(authData));
  };

  useEffect(() => {
    if (success) {
      handleCloseModal();
    }
  }, [dispatch, handleCloseModal, success]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return toast.error(error);
  }

  return (
    <>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Update Profile</DialogTitle>
        <form
          onSubmit={submitAuthForm}
          className="bg-white border border-slate-300 shadow-md py-7 px-2 md:px-5"
        >
          <div className="mb-3">
            <label htmlFor="name" className="mr-2 text-theme">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={authData.name}
              onChange={handleAuthInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="mr-2 text-theme">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={authData.email}
              onChange={handleAuthInputChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="profile" className="mr-2 text-theme">
              Profile:
            </label>
            <div className="flex gap-2 items-center justify-between profile-div">
              <input
                type="file"
                name="avatar"
                // className="form-control"
                accept="image/*"
                onChange={handleAuthInputChange}
              />
              <img
                src={authData.avatar !== "" ? authData.avatar : dummyAvatar}
                alt="avatar"
                className="rounded-full w-[45px] h-[45px] object-contain border border-darkGray"
              />
            </div>
          </div>
          <div className="text-center ">
            <Button className="ml-auto w-full btn-fill">Update</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateProfile;

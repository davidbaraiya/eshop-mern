import React, { useState } from "react";
import { Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import dummyAvatar from "../assets/images/dummy-user.png";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { registerAction } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [passwordVisibled, setPasswordVisibled] = useState(false);

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, user?.isLoggedIn]);

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
    dispatch(registerAction(authData));
  };

  // if (user.error) {
  //   toast.error(user.error);
  // }

  return (
    <section className="pb pt">
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span>Register</span>
          </h2>
        </Heading>
        <div className="auth-form max-w-[500px] mx-auto">
          <form
            onSubmit={submitAuthForm}
            className="bg-white border border-slate-300 shadow-md py-7 px-5"
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

            <div className="mb-3">
              <label htmlFor="password" className="mr-2 text-theme">
                Password:
              </label>
              <div className="relative">
                <input
                  type={passwordVisibled ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={authData.password}
                  onChange={handleAuthInputChange}
                />
                <span
                  className="absolute inset-y-0 right-2 flex items-center mt-2 cursor-pointer"
                  onClick={() => setPasswordVisibled((prev) => !prev)}
                >
                  {passwordVisibled ? (
                    <VisibilityOffOutlined sx={{ color: "gray" }} />
                  ) : (
                    <VisibilityOutlined sx={{ color: "gray" }} />
                  )}
                </span>
              </div>
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
                  width={"45px"}
                  height={"45px"}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center ">
              <Button className="ml-auto w-full btn-fill">Register</Button>
            </div>
            <hr className="my-5 border-darkGray w-1/2 mx-auto" />
            <p className="text-center">
              Already have an account?
              <Link to={"/auth/login"} className="font-bold underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;

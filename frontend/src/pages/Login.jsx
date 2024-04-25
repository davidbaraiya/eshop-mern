import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { Button } from "../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearErrors, loginAction } from "../redux/actions/userAction";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Login = ({ user }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisibled, setPasswordVisibled] = useState(false);

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  if (user.loading) {
    return <Loader />;
  }

  if (user.error) {
    toast.error(user.error);
    dispatch(clearErrors());
  }

  // handle input change
  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  // submit form
  const submitAuthForm = (e) => {
    e.preventDefault();
    const { email, password } = authData;
    if (email && password) {
      dispatch(loginAction(authData));
    } else {
      toast.error("please enter email and password");
    }
  };

  return (
    <section className="pt pb">
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span>Log In</span>
          </h2>
        </Heading>
        <div className="auth-form max-w-[500px] mx-auto">
          <form
            onSubmit={submitAuthForm}
            className="bg-white border border-slate-300 shadow-md py-7 px-5"
          >
            <div className="mb-3">
              <label htmlFor="email" className="mr-2 text-theme">
                Email:{" "}
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
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="mr-2 text-theme">
                  Password:
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-slate-800 text-sm underline"
                >
                  Forgot Password
                </Link>
              </div>
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

            <div className="text-center ">
              <Button className="ml-auto w-full btn-fill" type="submit">
                LogIn
              </Button>
            </div>
            <hr className="my-5 border-darkGray w-1/2 mx-auto" />
            <p className="text-center">
              don't have an account?{" "}
              <Link to={"/auth/register"} className="font-bold underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

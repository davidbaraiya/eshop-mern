import React, { useEffect, useState } from "react";
import { Button } from "../components";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changePasswordAction } from "../redux/actions/userAction";
import Loader from "../components/Loader";

const ChnagePassword = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector((state) => state.changePassword);
  const [authData, setAuthData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!user?.isLoggedIn) {
      navigate("/");
    }
  }, [navigate, user?.isLoggedIn]);

  const submitAuthForm = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = authData;
    if (oldPassword && newPassword && confirmPassword) {
      dispatch(changePasswordAction(authData));
    } else {
      toast.error("please enter valid input");
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("changed password successfully");
      navigate("/my-profile");
    }
  }, [success, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="pt pb">
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span>Chnage Password</span>
          </h2>
        </Heading>
        <div className="auth-form max-w-[500px] mx-auto">
          <form
            onSubmit={submitAuthForm}
            className="bg-white border border-slate-300 shadow-md py-7 px-5"
          >
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label htmlFor="oldPassword" className="mr-2 text-theme">
                  Old Password:
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  value={authData.oldPassword}
                  onChange={handleAuthInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label htmlFor="newPassword" className="mr-2 text-theme">
                  New Password:
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  value={authData.newPassword}
                  onChange={handleAuthInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label htmlFor="confirmPassword" className="mr-2 text-theme">
                  Confirm Password:
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={authData.confirmPassword}
                  onChange={handleAuthInputChange}
                />
              </div>
            </div>

            <div className="text-center ">
              <Button className="ml-auto w-full btn-fill">
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChnagePassword;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { singleUserAction, updateUser } from "../redux/actions/userAction";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { UPDATE_USER_RESET } from "../redux/contants/userConstant";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { singleUserLoading, singleUserError, singleUser } = useSelector(
    (state) => state.adminUser.singleUser
  );

  const { updateUserLoading, updateUserStatus, updateUserError } = useSelector(
    (state) => state.adminUser.updateUser
  );
  const [userRole, setUserRole] = useState(singleUser?.role || "");

  useEffect(() => {
    dispatch(singleUserAction(userId));
    if (updateUserStatus) {
      toast.success("user updated successfully");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, updateUserStatus, userId]);

  const submitUserEdit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("role", userRole);

    dispatch(updateUser(userId, myForm));
  };

  if (singleUserLoading || updateUserLoading) {
    return <Loader />;
  }

  if (singleUserError || updateUserError) {
    toast.error(singleUserError || updateUserError);
    dispatch({ type: UPDATE_USER_RESET });
  }

  console.log(userRole);
  return (
    <section className="admin-dashboard ">
      <div className="admin-orders-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">Edit Role</h3>
            <form
              onSubmit={submitUserEdit}
              className="bg-white border border-slate-300 shadow-md py-7 px-5 max-w-[50%] mx-auto"
            >
              <div className="mb-3">
                <label htmlFor="email" className="mr-2 text-theme">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={singleUser.email}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="mr-2 text-theme">
                  Name:
                </label>
                <input
                  type="name"
                  name="name"
                  className="form-control"
                  value={singleUser.name}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" classrole="mr-2 text-theme">
                  Role:
                </label>
                <select
                  name="role"
                  id="role"
                  value={singleUser.role}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="form-control"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="text-center ">
                <Button className="ml-auto w-full btn-fill" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;

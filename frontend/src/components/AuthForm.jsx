import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const AuthForm = ({ login }) => {
  return (
    <form
      action=""
      className="bg-white border border-slate-300 shadow-md py-7 px-5"
    >
      <div className="mb-3">
        <label htmlFor="name" className="mr-2 text-theme">
          Name:{" "}
        </label>
        <input type="text" name="name" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="mr-2 text-theme">
          Email:{" "}
        </label>
        <input type="email" name="email" className="form-control" />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="mr-2 text-theme">
          Password:{" "}
        </label>
        <input type="password" name="password" className="form-control" />
      </div>
      <div className="mb-5">
        <label htmlFor="profile" className="mr-2 text-theme">
          Profile:{" "}
        </label>
        <input type="file" name="profile" className="form-control" />
      </div>
      <div className="text-center ">
        <Button className="ml-auto w-full btn-fill">Register</Button>
      </div>
      <hr className="my-5 border-darkGray w-1/2 mx-auto" />
      <p className="text-center">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="font-bold underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;

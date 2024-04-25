import React from "react";
import { Button } from "../components";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="pt pb">
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span>Forgot Password</span>
          </h2>
        </Heading>
        <div className="auth-form max-w-[500px] mx-auto">
          <form
            action=""
            className="bg-white border border-slate-300 shadow-md py-7 px-5"
          >
            <div className="mb-3">
              <label htmlFor="email" className="mr-2 text-theme">
                Email:{" "}
              </label>
              <input type="email" name="email" className="form-control" />
            </div>

            <div className="text-center ">
              <Button className="ml-auto w-full btn-fill">submit</Button>
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

export default ForgotPassword;

import React from "react";
import Heading from "../components/Heading";
import { Button } from "../components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="pt pb">
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">Log In</h2>
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

            <div className="mb-3">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="mr-2 text-theme">
                  Password:{" "}
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-red hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input type="password" name="password" className="form-control" />
            </div>

            <div className="text-center ">
              <Button className="ml-auto w-full btn-fill">LogIn</Button>
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

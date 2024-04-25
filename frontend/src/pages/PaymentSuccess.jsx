import React from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Button } from "../components";

const PaymentSuccess = () => {
  return (
    <section className="pt pb bg-gray">
      <div className="container">
        <div className="text-center">
          <span>
            <VerifiedOutlinedIcon sx={{ color: "#28a745", fontSize: "60px" }} />
          </span>
          <h3 className="my-5">
            Your payment was <br /> successful{" "}
          </h3>
          <p>
            Thank you for your payment. we will be in contact with more details
            shortly
          </p>
          <div className="flex gap-5 justify-center">
            <Button as="Link" to={"/"} className="mt-5">
              Go to Home
            </Button>
            <Button as="Link" to={"/my-orders"} className="mt-5">
              View Order
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;

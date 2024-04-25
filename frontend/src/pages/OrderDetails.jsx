import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsAction } from "../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import toast from "react-hot-toast";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Order Comfirmed", "Shipped", "Delivered"];

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector(
    (state) => state.orderDetails
  );
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    dispatch(orderDetailsAction(orderId));
    if (orderDetails.orderStatus === "shipped") {
      setActiveStep(2);
    } else if (orderDetails.orderStatus === "delivered") {
      setActiveStep(3);
    } else {
      setActiveStep(1);
    }
  }, [dispatch, orderDetails.orderStatus, orderId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return toast.error(error);
  }

  const date = new Date(orderDetails.createdAt).toLocaleDateString("in");
  const getPaidDate = new Date(orderDetails.paidAt).toLocaleString("in");

  return (
    <section className="pb bg-gray">
      <Breadcrumb currentPage={"order details"} />
      <div className="container">
        <h3 className="mb-3">
          Order Details: <b className="text-[18px]"> #{orderDetails?._id}</b>
        </h3>
        <span>Date: {date}</span>

        <div className="my-8">
          <div className="w-[70%] mx-auto">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
        {orderDetails?.shippingInfo && (
          <div className="flex  bg-white w-full border border-gray shadow-md p-5 mb-4">
            <div className="address w-[50%]">
              <h4 className="mb-3">Shipping Info:</h4>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="name" className="text-sm font-bold">
                  Name:
                </label>
                <span className="capitalize">{orderDetails.user.name}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="phone" className="text-sm font-bold">
                  Phone:
                </label>
                <span className="capitalize">
                  {orderDetails.shippingInfo.phone}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="phone" className="text-sm font-bold">
                  Address:
                </label>
                <span className="capitalize">
                  {orderDetails.shippingInfo.address},
                  {orderDetails.shippingInfo.city},
                  {orderDetails.shippingInfo.state},
                  {orderDetails.shippingInfo.pincode}.
                </span>
              </div>
            </div>
            <div className="payment-status">
              <h4 className="mb-3">Payment Status:</h4>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="status" className="text-sm font-bold">
                  Status:
                </label>
                <span
                  className={
                    "capitalize font-bold " +
                    (orderDetails?.paymentInfo?.status === "succeeded"
                      ? "text-green-600"
                      : "")
                  }
                >
                  {orderDetails.paymentInfo.status}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="date" className="text-sm font-bold">
                  Date:
                </label>
                <span className="capitalize">{getPaidDate}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-5 items-start">
          <div className="w-full bg-white">
            {orderDetails?.orderItems?.map(
              ({ id, name, image, price, quantity }) => (
                <div
                  key={id}
                  className="flex items-start gap-3 mt-4 border-b border-darkGray py-4 px-3"
                >
                  <div className="img-wrapper max-w-[140px] w-full h-full bg-gray relative pt-[100px]">
                    <img
                      src={image}
                      alt={name}
                      className="absolute inset-0 object-contain w-full h-full"
                    />
                  </div>
                  <div className="right-side flex items-start justify-between gap-5 w-full">
                    <div>
                      <h5>{name}</h5>
                      <span className="text-slate-600 ">Color: red</span>
                      <span className="text-slate-600 ml-3">Size:M</span>
                      <div className="flex gap-3 items-center">
                        <div className="font-bold  flex-shrink-0 ">
                          &#8377; {price} x {quantity}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div className="font-bold  flex-shrink-0 ">
                        &#8377; {Math.round(price * quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="w-[35%]">
            <div className="bg-white border border-gray shadow-md py-5 px-4">
              <h3>Order Summery</h3>
              <div className="mt-4">
                <div className="mb-2 gap-2 flex justify-between items-center">
                  Sub Total: <span> &#8377; {orderDetails?.itemsPrice}</span>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  Shipping Charge:
                  <span> &#8377; {orderDetails?.shippingPrice}</span>
                </div>
                <div className="mb-3 flex justify-between items-center">
                  GST(18%): <span> &#8377; {orderDetails?.taxPrice}</span>
                </div>
              </div>
              <hr />
              <div className="mt-3  flex justify-between items-center">
                Total: <span> &#8377; {orderDetails?.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;

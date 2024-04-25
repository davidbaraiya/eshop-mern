import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsAction, updateOrder } from "../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import { Button } from "../components";
import { UPDATE_ORDERS_RESET } from "../redux/contants/orderConstant";

const EditOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector(
    (state) => state.orderDetails
  );
  const { updateOrderLoading, updateOrderStatus, updateOrderError } =
    useSelector((state) => state.adminOrders.updateOrder);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(orderDetailsAction(orderId));
    if (updateOrderStatus) {
      toast.success("updated successfully");
      dispatch({ type: UPDATE_ORDERS_RESET });
    }
  }, [dispatch, orderId, updateOrderStatus]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateOrder(orderId, myForm));
  };

  if (loading) {
    return <Loading />;
  }

  if (updateOrderLoading) {
    return <Loading />;
  }

  if (error || updateOrderError) {
    return toast.error(error || updateOrderError);
  }

  return (
    <section className="admin-dashboard ">
      <div className="flex gap-5 items-start">
        <Sidebar />
        <div className="main-dashbord">
          {orderDetails?.shippingInfo && (
            <div className="flex  bg-white w-full border border-gray shadow-md p-5 mb-4">
              <div className="w-[80%]">
                <div className="address ">
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
                <div className="payment-status mt-5">
                  <h4 className="mb-3">Payment Status:</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <label htmlFor="amount" className="text-sm font-bold">
                      Total Amount:
                    </label>
                    <span className="capitalize font-bold">
                      &#8377;
                      {orderDetails?.totalPrice}
                    </span>
                  </div>
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
                </div>
              </div>
              {orderDetails.orderStatus !== "delivered" && (
                <div className="flex-1">
                  <form action="" onSubmit={updateOrderSubmitHandler}>
                    <select
                      className="w-full form-control"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">select</option>
                      {orderDetails.orderStatus === "processing" && (
                        <option value="shipped">shipped</option>
                      )}
                      {orderDetails.orderStatus === "shipped" && (
                        <option value="delivered">delivered</option>
                      )}
                    </select>
                    <Button type="submit" className="mt-5 w-full">
                      process
                    </Button>
                  </form>
                </div>
              )}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditOrder;

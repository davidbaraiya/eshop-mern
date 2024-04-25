import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useSelector } from "react-redux";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cart, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [subTotal, setSubTotal] = useState(0);

  const address = `
    ${shippingInfo.address},
    ${shippingInfo.city},
    ${shippingInfo.pincode},
    ${shippingInfo.state},
    ${shippingInfo.country},
  `;

  useEffect(() => {
    const subTtl = cart.reduce(
      (acc, item) => (acc += item.price * item.quantity),
      0
    );
    setSubTotal(subTtl);
  }, [cart]);

  const shippingCharges = subTotal >= 1000 ? 0 : 20;
  const gst = (subTotal * 18) / 100;
  const total = subTotal + gst + shippingCharges;

  const proccessPayment = () => {
    const data = {
      subTotal,
      gst,
      shippingCharges,
      total,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment/process");
  };

  return (
    <section className="pt pb bg-gray">
      <div className="container">
        <Heading>
          <h2 title="true">Confirm Order</h2>
        </Heading>

        <div className="shipping flex gap-5">
          <div className="w-full">
            <div className="w-full bg-white border border-gray shadow-md p-5 mb-4">
              <h4 className="mb-3">Shipping Info</h4>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="name" className="text-sm font-bold">
                  Name:
                </label>
                <span className="capitalize">{user?.name}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="phone" className="text-sm font-bold">
                  Phone:
                </label>
                <span className="capitalize">{shippingInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <label htmlFor="phone" className="text-sm font-bold">
                  Address:
                </label>
                <span className="capitalize">{address}</span>
              </div>
            </div>
            <div className="col-span-2 gap-5 bg-white border border-gray shadow-md py-5 px-4">
              {cart?.map(({ id, name, image, price, quantity }) => (
                <div
                  key={id}
                  className="flex items-start gap-3 mt-4 border-b border-darkGray pb-4 "
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
              ))}
            </div>
          </div>

          <div className="w-[35%]">
            <div className="bg-white border border-gray shadow-md py-5 px-4">
              <h3>Order Summery</h3>
              <div className="mt-4">
                <div className="mb-2 gap-2 flex justify-between items-center">
                  Sub Total: <span> &#8377; {subTotal.toFixed(2)}</span>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  Shipping Charge:
                  <span> &#8377; {shippingCharges}</span>
                </div>
                <div className="mb-3 flex justify-between items-center">
                  GST(18%): <span> &#8377; {gst.toFixed(2)}</span>
                </div>
              </div>
              <hr />
              <div className="mt-3  flex justify-between items-center">
                Total: <span> &#8377; {total.toFixed(2)}</span>
              </div>
              <Button
                className="mt-3 btn-fill w-full"
                onClick={proccessPayment}
              >
                Procceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrder;

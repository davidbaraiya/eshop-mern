import React, { useRef } from "react";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { createOrderAction } from "../redux/actions/orderAction";

// card = 4000003560000008

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cart, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cart,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };

  const submitPayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrderAction(order));
          navigate("/payment/success");
          localStorage.removeItem("cart");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error);
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="pt pb">
      <div className="container">
        <Heading className="text-center">
          <h3 title="true">Payment Info</h3>
        </Heading>
        <div className="payment-cart max-w-[400px] mx-auto">
          <form
            onSubmit={submitPayment}
            className="bg-white border border-slate-300 shadow-md py-7 px-5"
          >
            <div className="mb-3 flex items-center gap-2 form-control w-full ">
              <CreditCardIcon sx={{ color: "#183A40" }} />
              <div className="w-full ">
                <CardNumberElement />
              </div>
            </div>
            <div className="mb-3 flex items-center gap-2 form-control p-0">
              <EventIcon sx={{ color: "#183A40" }} />
              <div className="w-full ">
                <CardExpiryElement />
              </div>
            </div>
            <div className="mb-3 flex items-center gap-2 form-control p-0">
              <VpnKeyIcon sx={{ color: "#183A40" }} />
              <div className="w-full ">
                <CardCvcElement />
              </div>
            </div>
            <div className="text-center ">
              <Button
                className="ml-auto w-full btn-fill"
                type="submit"
                ref={payBtn}
              >
                pay &#8377;{orderInfo?.total}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Payment;

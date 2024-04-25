import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "../components";
import { Add, Close, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeCartAction } from "../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);

  const handleRemoveCart = (id) => {
    dispatch(removeCartAction(id));
  };

  const incrQuntity = (id, quantity, stock) => {
    let newQnty = stock > quantity ? quantity + 1 : stock;
    dispatch(addToCartAction(id, newQnty));
  };

  const decrQuntity = (id, quantity) => {
    let newQnty = quantity !== 1 ? quantity - 1 : 1;
    dispatch(addToCartAction(id, newQnty));
  };

  useEffect(() => {
    const subTtl = cart.reduce(
      (acc, item) => (acc += item.price * item.quantity),
      0
    );
    setSubTotal(subTtl);
    const gst = (subTtl * 18) / 100;
    setGst(gst);
  }, [cart]);

  const handleCheckout = () => {
    navigate("/auth/login?redirect=shipping");
  };

  return (
    <section className="cart-page pb bg-gray">
      <Breadcrumb currentPage={"Cart"} />
      <div className="container">
        <Heading className="text-center">
          <h2 title="true">
            <span> Cart</span>
            {/* <b className="text-sm font-normal text-slate-800">(3 items)</b> */}
          </h2>
        </Heading>
        {cart?.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 items-start">
            <div className="col-span-2 gap-5 bg-white border border-gray shadow-md py-5 px-4">
              {cart?.map(({ id, name, image, price, stock, quantity }) => (
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
                          &#8377; {price}
                        </div>
                        <div className="quantity">
                          <div className="inline-flex mt-2 min-w-fit">
                            <Button
                              showIcon={false}
                              className="text-xs"
                              onClick={() => decrQuntity(id, quantity)}
                            >
                              <Remove fontSize="md" />
                            </Button>
                            <div className="flex items-center px-3 border-t border-b">
                              {quantity}
                            </div>
                            <Button
                              showIcon={false}
                              className="text-xs"
                              onClick={() => incrQuntity(id, quantity, stock)}
                            >
                              <Add fontSize="md" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center">
                      <div className="font-bold  flex-shrink-0 ">
                        &#8377; {Math.round(price * quantity)}
                      </div>
                      <Button
                        showIcon={false}
                        onClick={() => handleRemoveCart(id)}
                      >
                        <Close fontSize="lg" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray shadow-md py-5 px-4">
              <h3>Order Summery</h3>
              <div className="mt-3">
                <div className="mb-2 gap-2 flex justify-between items-center">
                  Sub Total: <span> &#8377; {subTotal.toFixed(2)}</span>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  Shipping Charge:
                  <span> &#8377; {subTotal >= 1000 ? 0 : 20}</span>
                </div>
                <div className="mb-3 flex justify-between items-center">
                  GST(18%): <span> &#8377; {gst.toFixed(2)}</span>
                </div>
              </div>
              <hr />
              <div className="mt-3  flex justify-between items-center">
                Total: <span> &#8377; {(subTotal + 20 + gst).toFixed(2)}</span>
              </div>
              <Button className="mt-3 btn-fill w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h5 className="mb-5">Empty Cart</h5>
            <Button as="Link" to="/products">
              Go To Shop
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;

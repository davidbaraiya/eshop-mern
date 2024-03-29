import React from "react";
import Heading from "../components/Heading";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "../components";
import { Add, Close, Remove } from "@mui/icons-material";

const Cart = () => {
  return (
    <section className="cart-page pb pt bg-gray">
      <div className="container">
        <Button backButton={true} className="mb-3">
          Go To Back
        </Button>
        <Breadcrumb currentPage={"Cart"} />
        <Heading>
          <h2 title="true">
            Shoping <span> Cart</span>{" "}
            <b className="text-sm font-normal text-slate-800">(3 items)</b>
          </h2>
        </Heading>
        <div className="grid grid-cols-3 gap-5 items-start">
          <div className="col-span-2 gap-5 bg-white border border-gray shadow-md py-5 px-4">
            <div className="flex items-start gap-3 mt-4 border-b border-darkGray pb-4 ">
              <div className="img-wrapper max-w-[140px] w-full h-full bg-gray relative pt-[100px]">
                <img
                  src="https://themes.workdo.io/html/style/assets/images/cart1.png"
                  alt="product img"
                  className="absolute inset-0 object-contain w-full h-full"
                />
              </div>
              <div className="right-side flex items-start justify-between gap-5 w-full">
                <div>
                  <h5>Buster lorem word</h5>
                  <span className="text-slate-600 ">Color: red</span>
                  <span className="text-slate-600 ml-3">Size:M</span>
                  <div className="flex gap-3 items-center">
                    <div className="font-bold  flex-shrink-0 ">&#8377; 450</div>
                    <div className="quantity ">
                      <div className="inline-flex mt-2 min-w-fit">
                        <Button showIcon={false} className="text-xs">
                          <Remove fontSize="md" />
                        </Button>
                        <div className="flex items-center px-3 border-t border-b">
                          5
                        </div>
                        <Button showIcon={false} className="text-xs">
                          <Add fontSize="md" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="font-bold  flex-shrink-0 ">&#8377; 450</div>
                  <Button showIcon={false}>
                    <Close fontSize="lg" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4  border-b border-darkGray pb-4">
              <div className="img-wrapper max-w-[140px] w-full h-full bg-gray relative pt-[100px]">
                <img
                  src="https://themes.workdo.io/html/style/assets/images/cart1.png"
                  alt="product img"
                  className="absolute inset-0 object-contain w-full h-full"
                />
              </div>
              <div className="right-side flex items-start justify-between gap-5 w-full">
                <div>
                  <h5>Buster lorem word</h5>
                  <span className="text-slate-600 ">Color: red</span>
                  <span className="text-slate-600 ml-3">Size:M</span>
                  <div className="flex gap-3 items-center">
                    <div className="font-bold  flex-shrink-0 ">&#8377; 450</div>
                    <div className="quantity ">
                      <div className="inline-flex mt-2 min-w-fit">
                        <Button showIcon={false} className="text-xs">
                          <Remove fontSize="md" />
                        </Button>
                        <div className="flex items-center px-3 border-t border-b">
                          5
                        </div>
                        <Button showIcon={false} className="text-xs">
                          <Add fontSize="md" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="font-bold  flex-shrink-0 ">&#8377; 450</div>
                  <Button showIcon={false}>
                    <Close fontSize="lg" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray shadow-md py-5 px-4">
            <h3>Order Summery</h3>
            <div className="mt-3">
              <div className="mb-2 gap-2 flex justify-between items-center">
                Sub Total: <span> &#8377; 200</span>
              </div>
              <div className="mb-2 flex justify-between items-center">
                Shipping Charge:
                <span> &#8377; 20</span>
              </div>
              <div className="mb-3 flex justify-between items-center">
                GST(18%): <span> &#8377; 20</span>
              </div>
            </div>
            <hr />
            <div className="mt-3  flex justify-between items-center">
              Total: <span> &#8377; 2500</span>
            </div>
            <Button className="mt-3 btn-fill w-full">Checkout</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

import React from "react";
import Heading from "../components/Heading";
import Breadcrumb from "../components/Breadcrumb";
import { Button } from "../components";

const Cart = () => {
  return (
    <section className="cart-page pb pt">
      <div className="container">
        <Button backButton={true} className="mb-3">
          Go To Back
        </Button>
        <Breadcrumb currentPage={"Cart"} />
        <Heading>
          <h2 title="true">Cart</h2>
        </Heading>
        <div className="grid grid-cols-2 gap-5">
          <div>cart</div>
          <div>cart details</div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

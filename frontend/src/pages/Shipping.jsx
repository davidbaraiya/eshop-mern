import React, { useState } from "react";
import Heading from "../components/Heading";
import { Button } from "../components";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveShippingAction } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [shippingData, setShippingData] = useState({
    address: shippingInfo?.address,
    city: shippingInfo?.city,
    pincode: shippingInfo?.pincode,
    phone: shippingInfo?.phone,
    country: shippingInfo?.country,
    state: shippingInfo?.state,
  });

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    if (shippingData.phone.length < 10 || shippingData.phone.length > 10) {
      toast.error("phone number should be 10 digits long");
      return;
    }
    dispatch(saveShippingAction(shippingData));
    navigate("/order/confirm");
  };

  return (
    <section className="pt pb">
      <div className="container">
        <Heading>
          <h2 title="true">Shipping</h2>
        </Heading>
        <div className=" max-w-[400px] mx-auto">
          <form
            action=""
            className="bg-white border border-slate-300 shadow-md py-7 px-5"
            onSubmit={handleShippingSubmit}
          >
            <div className="mb-3">
              <label htmlFor="address" className="mr-2 text-theme capitalize">
                address:
              </label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={shippingData.address}
                onChange={handleShippingInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="mr-2 text-theme capitalize">
                city:
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={shippingData.city}
                onChange={handleShippingInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="mr-2 text-theme capitalize">
                pincode:
              </label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                value={shippingData.pincode}
                onChange={handleShippingInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="mr-2 text-theme capitalize">
                phone:
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={shippingData.phone}
                onChange={handleShippingInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="mr-2 text-theme capitalize">
                country:
              </label>
              <select
                name="country"
                id="country"
                className="border border-darkGray w-full p-2"
                onChange={handleShippingInputChange}
              >
                {Country.getAllCountries().map(({ isoCode, name }) => (
                  <option key={isoCode} value={isoCode}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {shippingData.country && (
              <div className="mb-3">
                <label htmlFor="state" className="mr-2 text-theme capitalize">
                  state:
                </label>
                <select
                  name="state"
                  id="state"
                  className="border border-darkGray w-full p-2"
                  onChange={handleShippingInputChange}
                >
                  {State.getStatesOfCountry(shippingData.country).map(
                    ({ isoCode, name }) => (
                      <option key={isoCode} value={isoCode}>
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
            <div className="text-center ">
              <Button className="ml-auto w-full btn-fill" type="submit">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Shipping;

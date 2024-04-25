import axios from "axios";
import {
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  REMOVE_CART_SUCCESS,
  SAVE_SHIPPING_INFO,
} from "../contants/cartConstant";

export const addToCartAction =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_TO_CART_LOADING });
      const { data } = await axios.get(`/api/v1/product/${productId}`);

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: {
          id: productId,
          name: data.product.name,
          image: data.product.images[0].url,
          price: data.product.price,
          stock: data.product.stock,
          quantity,
        },
      });

      localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const removeCartAction = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_SUCCESS,
    payload: productId,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
};

export const saveShippingAction = (data) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

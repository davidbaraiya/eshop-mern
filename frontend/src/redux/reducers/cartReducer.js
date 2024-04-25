import toast from "react-hot-toast";
import {
  ADD_TO_CART_LOADING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  REMOVE_CART_SUCCESS,
  SAVE_SHIPPING_INFO,
} from "../contants/cartConstant";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_LOADING:
      return { ...state, loading: true };

    case ADD_TO_CART_SUCCESS:
      const product = action.payload;
      const istemExisted = state.cart.find((item) => item.id === product.id);
      if (istemExisted) {
        return {
          loading: false,
          cart: state.cart.map((item) => {
            return item.id === istemExisted.id ? product : item;
          }),
        };
      }
      toast.success("added to cart");
      return {
        ...state,
        loading: false,
        cart: [...state.cart, action.payload],
      };

    case ADD_TO_CART_ERROR:
      return { ...state, loading: false, error: action.payload };

    case REMOVE_CART_SUCCESS:
      const filteredCart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, loading: false, cart: filteredCart };

    case SAVE_SHIPPING_INFO:
      return { ...state, loading: false, shippingInfo: action.payload };

    default:
      return state;
  }
};

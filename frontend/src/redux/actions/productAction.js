import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_ERROR,
  ALL_PRODUCTS_LOADING,
} from "../contants/productsContants";
import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_LOADING });
    const data = await axios.get("/api/v1/products");
    if (data.statusText === "OK") {
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: ALL_PRODUCTS_ERROR, payload: error.message });
  }
};

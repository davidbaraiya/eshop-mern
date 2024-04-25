import axios from "axios";
import {
  NEW_ORDER_LOADING,
  NEW_ORDER_SUCCESS,
  NEW_ORDER_ERROR,
  GET_ORDER_LOADING,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  ORDER_DETAILS_LOADING,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_ERROR,
  GET_ALL_ORDERS_ERROR,
  GET_ALL_ORDERS_LOADING,
  GET_ALL_ORDERS_SUCCESS,
  DELETE_ORDERS_SUCCESS,
  DELETE_ORDERS_ERROR,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_ERROR,
  UPDATE_ORDERS_LOADING,
} from "../contants/orderConstant";

// create order
export const createOrderAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ORDER_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: NEW_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: NEW_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all orders
export const getOrderAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/orders/me", config);
    dispatch({ type: GET_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: GET_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get order details
export const orderDetailsAction = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/v1/order/${orderId}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};

/////////////////////   admin  ///////////////////////////
// get all orders
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ORDERS_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/admin/orders", config);
    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update order
export const updateOrder = (orderId, formData) => async (dispatch) => {
  console.log(formData);
  try {
    dispatch({ type: UPDATE_ORDERS_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${orderId}`,
      formData,
      config
    );
    console.log(data);
    dispatch({
      type: UPDATE_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete order
export const deleteOrderAction = (orderId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/v1/admin/order/${orderId}`,
      config
    );
    dispatch({
      type: DELETE_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

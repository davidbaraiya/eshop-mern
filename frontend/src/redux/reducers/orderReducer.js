import { updateOrder } from "../actions/orderAction";
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
  DELETE_ORDERS_RESET,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_ERROR,
  UPDATE_ORDERS_LOADING,
  UPDATE_ORDERS_RESET,
} from "../contants/orderConstant";

// create order
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ORDER_LOADING:
      return { ...state, loading: true };

    case NEW_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case NEW_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// get my orders
export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_LOADING:
      return { ...state, loading: true };

    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case GET_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// get order details
export const orderDetailsReducer = (state = { orderDetails: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_LOADING:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, orderDetails: action.payload };

    case ORDER_DETAILS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

////////////  Admin  //////////////////
const orderInitialState = {
  allOrders: {
    allOrderLoading: false,
    allOrders: [],
    totalAmount: 0,
    allOrderError: null,
  },
  updateOrder: {
    updateOrderLoading: false,
    updateOrderStatus: false,
    updateOrderError: null,
  },
  deleteOrder: {
    deleteOrder: false,
    deleteOrderError: null,
  },
};

export const adminOrderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    // get all product
    case GET_ALL_ORDERS_LOADING:
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          allOrderLoading: true,
        },
      };

    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          allOrderLoading: false,
          allOrders: action.payload.orders,
          totalAmount: action.payload.totalAmount,
        },
      };

    case GET_ALL_ORDERS_ERROR:
      return {
        ...state,
        allOrders: {
          ...state.allOrders,
          allOrderLoading: false,
          allOrdersError: action.payload,
        },
      };

    case UPDATE_ORDERS_LOADING:
      return {
        ...state,
        updateOrder: {
          ...state.updateOrder,
          updateOrderLoading: true,
        },
      };

    case UPDATE_ORDERS_SUCCESS:
      return {
        ...state,
        updateOrder: {
          ...state.updateOrder,
          updateOrderLoading: false,
          updateOrderStatus: action.payload.success,
        },
      };

    case UPDATE_ORDERS_ERROR:
      return {
        ...state,
        updateOrder: {
          ...state.updateOrder,
          updateOrderLoading: false,
          updateOrderError: action.payload.error,
        },
      };
    case UPDATE_ORDERS_RESET:
      return {
        ...state,
        updateOrder: {
          updateOrderLoading: false,
          updateOrderStatus: false,
          updateOrderError: null,
        },
      };

    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          deleteOrder: action.payload.success,
        },
      };

    case DELETE_ORDERS_ERROR:
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          deleteOrder: false,
          deleteOrderError: action.payload.success,
        },
      };

    case DELETE_ORDERS_RESET:
      return {
        ...state,
        deleteOrder: {
          deleteOrder: false,
          deleteOrderError: null,
        },
      };

    default:
      return state;
  }
};

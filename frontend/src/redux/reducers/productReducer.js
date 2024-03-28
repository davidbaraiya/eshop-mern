import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_ERROR,
  ALL_PRODUCTS_LOADING,
} from "../contants/productsContants";

const initialState = {
  allProducts: {
    isLoading: false,
    allProducts: [],
    isError: null,
  },
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_LOADING:
      return {
        ...state,
        allProducts: { ...state.allProducts, isLoading: true },
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          isLoading: false,
          allProducts: action.payload,
        },
      };
    case ALL_PRODUCTS_ERROR:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          isLoading: false,
          isError: action.payload,
        },
      };

    default:
      return { ...state };
  }
};

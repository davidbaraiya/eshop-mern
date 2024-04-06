import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_ERROR,
  ALL_PRODUCTS_LOADING,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_ERROR,
  SINGLE_PRODUCT_LOADING,
  ADD_PRODUCT_REVIEW_LOADING,
  ADD_PRODUCT_REVIEW_SUCCESS,
  ADD_PRODUCT_REVIEW_ERROR,
  PRODUCT_CATEGORIES_SUCCESS,
  PRODUCT_CATEGORIES_ERROR,
} from "../contants/productConstant";
import axios from "axios";

// get all products
export const getAllProducts = (data) => {
  const {
    searchQuery = "",
    page = 1,
    category = "",
    priceRange = [20, 50000],
    rating = 0,
  } = data || {};
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_LOADING });
      let link = `/api/v1/products?keyword=${searchQuery}&page=${page}&price[gt]=${priceRange[0]}&price[lt]=${priceRange[1]}&ratings[gte]=${rating}`;
      if (category) {
        link = `${link}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_ERROR,
        payload: error.response.data.message,
      });
    }
  };
};

// get single product
export const getSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_LOADING });
    const { data } = await axios.get(`/api/v1/product/${productId}`);
    dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get product categories
export const getProductCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/categories`);
    dispatch({ type: PRODUCT_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORIES_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add reviews
export const addProductReview = (data) => async (dispatch) => {
  const formData = {
    rating: data.rateValue,
    comment: data.message,
    productId: data.productId,
  };
  console.log(formData);
  try {
    dispatch({ type: ADD_PRODUCT_REVIEW_LOADING });
    const { data } = await axios.put("/api/v1/review", formData);
    console.log(data);
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};

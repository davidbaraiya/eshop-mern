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
  CLEAR_ERRORS,
  GET_ADMIN_PRODUCTS_LOADING,
  GET_ADMIN_PRODUCTS_SUCCESS,
  GET_ADMIN_PRODUCTS_ERROR,
  CREATE_ADMIN_PRODUCTS_LOADING,
  CREATE_ADMIN_PRODUCTS_SUCCESS,
  CREATE_ADMIN_PRODUCTS_ERROR,
  DELETE_ADMIN_PRODUCTS_LOADING,
  DELETE_ADMIN_PRODUCTS_SUCCESS,
  DELETE_ADMIN_PRODUCTS_ERROR,
  UPDATE_ADMIN_PRODUCTS_LOADING,
  UPDATE_ADMIN_PRODUCTS_SUCCESS,
  UPDATE_ADMIN_PRODUCTS_ERROR,
  GET_ALL_PRODUCT_REVIEW_LOADING,
  GET_ALL_PRODUCT_REVIEW_SUCCESS,
  GET_ALL_PRODUCT_REVIEW_ERROR,
  DELETE_PRODUCT_REVIEW_LOADING,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  DELETE_PRODUCT_REVIEW_ERROR,
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
  try {
    dispatch({ type: ADD_PRODUCT_REVIEW_LOADING });
    const { data } = await axios.put("/api/v1/review", formData);
    dispatch({ type: ADD_PRODUCT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};

// clearErrors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

//////////////////  Admin   ////////////////
// get all products -admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_PRODUCTS_LOADING });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({ type: GET_ADMIN_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_PRODUCTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// create products  -admin
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ADMIN_PRODUCTS_LOADING });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({
      type: CREATE_ADMIN_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ADMIN_PRODUCTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update products  -admin
export const updateProduct = (productData, productId) => async (dispatch) => {
  console.log(productId);
  try {
    dispatch({ type: UPDATE_ADMIN_PRODUCTS_LOADING });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${productId}`,
      productData,
      config
    );
    console.log(data);

    dispatch({
      type: UPDATE_ADMIN_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error.response.data.message);
    dispatch({
      type: UPDATE_ADMIN_PRODUCTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// create products  -admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADMIN_PRODUCTS_LOADING });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`, config);
    dispatch({
      type: DELETE_ADMIN_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_PRODUCTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all reviews
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_REVIEW_LOADING });
    const { data } = await axios.get(`/api/v1/reviews/?id=${productId}`);
    dispatch({ type: GET_ALL_PRODUCT_REVIEW_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete review
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  console.log(reviewId, productId);
  try {
    dispatch({ type: DELETE_PRODUCT_REVIEW_LOADING });
    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );
    dispatch({ type: DELETE_PRODUCT_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};

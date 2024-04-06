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

// all products
export const allProductReducer = (state = { allProducts: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCTS_SUCCESS:
      const {
        success,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      } = action.payload;
      return {
        loading: false,
        success: success,
        allProducts: products,
        productsCount: productsCount,
        resultPerPage: resultPerPage,
        filteredProductsCount: filteredProductsCount,
      };
    case ALL_PRODUCTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

// single product
export const singleProductReducer = (state = { singleProduct: {} }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_LOADING:
      return { loading: true };

    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
        loading: false,
        singleProduct: action.payload.product,
      };

    case SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleProduct: { loading: false, error: action.payload },
      };

    default:
      return { ...state };
  }
};

// product categories
export const productCategoriesReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORIES_SUCCESS:
      return {
        productCategories: action.payload.categories,
      };

    case PRODUCT_CATEGORIES_ERROR:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};

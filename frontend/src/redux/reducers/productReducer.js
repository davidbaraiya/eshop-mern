import { deleteProduct } from "../actions/productAction";
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
  GET_ADMIN_PRODUCTS_LOADING,
  GET_ADMIN_PRODUCTS_SUCCESS,
  GET_ADMIN_PRODUCTS_ERROR,
  CLEAR_ERRORS,
  CREATE_ADMIN_PRODUCTS_LOADING,
  CREATE_ADMIN_PRODUCTS_SUCCESS,
  CREATE_ADMIN_PRODUCTS_ERROR,
  DELETE_ADMIN_PRODUCTS_SUCCESS,
  DELETE_ADMIN_PRODUCTS_ERROR,
  CREATE_ADMIN_PRODUCTS_RESET,
  DELETE_ADMIN_PRODUCTS_RESET,
  UPDATE_ADMIN_PRODUCTS_LOADING,
  UPDATE_ADMIN_PRODUCTS_SUCCESS,
  UPDATE_ADMIN_PRODUCTS_ERROR,
  UPDATE_ADMIN_PRODUCTS_RESET,
  GET_ALL_PRODUCT_REVIEW_LOADING,
  GET_ALL_PRODUCT_REVIEW_SUCCESS,
  GET_ALL_PRODUCT_REVIEW_ERROR,
  DELETE_PRODUCT_REVIEW_LOADING,
  DELETE_PRODUCT_REVIEW_SUCCESS,
  DELETE_PRODUCT_REVIEW_ERROR,
  DELETE_PRODUCT_REVIEW_RESET,
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

    case CLEAR_ERRORS:
      return { ...state, error: null };

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

// add reviews
export const addProductReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REVIEW_LOADING:
      return { loading: true };

    case ADD_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: action.payload };

    case ADD_PRODUCT_REVIEW_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

////////////  Admin  //////////////////
const adminInitialState = {
  allProducts: {
    adminProductsLoading: false,
    adminProducts: [],
    adminProductsError: null,
  },
  createProduct: {
    createProductLoading: false,
    createProductSuccess: false,
    createProductError: null,
  },
  updateProduct: {
    updateProductLoading: false,
    updateProductSuccess: false,
    updateProductError: null,
  },
  deleteProduct: {
    deleteProductSuccess: false,
    deleteProductError: null,
  },
};

export const adminProductReducer = (state = adminInitialState, action) => {
  switch (action.type) {
    // get all product
    case GET_ADMIN_PRODUCTS_LOADING:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          adminProductsLoading: true,
        },
      };

    case GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          adminProductsLoading: false,
          adminProducts: action.payload.products,
        },
      };
    case GET_ADMIN_PRODUCTS_ERROR:
      return {
        ...state,
        allProducts: {
          ...state.allProducts,
          adminProductsLoading: false,
          adminProductsError: action.payload,
        },
      };

    ///  create product
    case CREATE_ADMIN_PRODUCTS_LOADING:
      return {
        ...state,
        createProduct: { ...state.createProduct, createProductLoading: true },
      };

    case CREATE_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          createProductLoading: false,
          createProductSuccess: action.payload.success,
        },
      };

    case CREATE_ADMIN_PRODUCTS_ERROR:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          createProductLoading: false,
          createProductError: action.payload,
        },
      };

    case CREATE_ADMIN_PRODUCTS_RESET:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          createProductLoading: false,
          createProductSuccess: false,
        },
      };

    /// update product
    case UPDATE_ADMIN_PRODUCTS_LOADING:
      return {
        ...state,
        updateProduct: {
          ...state.updateProduct,
          updateProductLoading: true,
        },
      };
    case UPDATE_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        updateProduct: {
          ...state.updateProduct,
          updateProductLoading: false,
          updateProductSuccess: true,
        },
      };

    case UPDATE_ADMIN_PRODUCTS_ERROR:
      console.log(action.payload);
      return {
        ...state,
        updateProduct: {
          ...state.updateProduct,
          updateProductSuccess: false,
          updateProductError: action.payload.error,
        },
      };

    case UPDATE_ADMIN_PRODUCTS_RESET:
      return {
        ...state,
        updateProduct: {
          ...state.updateProduct,
          updateProductSuccess: false,
          updateProductError: false,
        },
      };

    /// delete product
    case DELETE_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          deleteProductSuccess: action.payload.success,
        },
      };

    case DELETE_ADMIN_PRODUCTS_ERROR:
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          deleteProductSuccess: false,
          deleteProductError: action.payload.error,
        },
      };

    case DELETE_ADMIN_PRODUCTS_RESET:
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          deleteProductSuccess: false,
          deleteProductError: false,
        },
      };

    default:
      return state;
  }
};

const reviewsInitialState = {
  adminReviews: {
    adminReviewsLoading: false,
    adminReviews: [],
    adminReviewsError: null,
  },
  deleteReview: {
    deleteReviewLoading: false,
    deleteReviewStatus: false,
    deleteReviewError: null,
  },
};

export const adminReviewsReducer = (state = reviewsInitialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT_REVIEW_LOADING:
      return {
        ...state,
        adminReviews: {
          ...state.adminReviews,
          adminReviewsLoading: true,
        },
      };

    case GET_ALL_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        adminReviews: {
          ...state.adminReviews,
          adminReviewsLoading: false,
          adminReviews: action.payload.reviews,
        },
      };

    case GET_ALL_PRODUCT_REVIEW_ERROR:
      return {
        ...state,
        adminReviews: {
          ...state.adminReviews,
          adminReviewsLoading: false,
          adminReviewsError: action.payload,
        },
      };

    case DELETE_PRODUCT_REVIEW_LOADING:
      return {
        ...state,
        deleteReview: {
          ...state.deleteReview,
          deleteReviewLoading: true,
        },
      };

    case DELETE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        deleteReview: {
          ...state.deleteReview,
          deleteReviewLoading: false,
          deleteReviewStatus: action.payload.success,
          deleteReviewError: null,
        },
      };

    case DELETE_PRODUCT_REVIEW_ERROR:
      return {
        ...state,
        deleteReview: {
          ...state.deleteReview,
          deleteReviewLoading: false,
          deleteReviewError: action.payload,
        },
      };

    case DELETE_PRODUCT_REVIEW_RESET:
      return {
        ...state,
        deleteReview: {
          deleteReviewLoading: false,
          deleteReviewStatus: false,
          deleteReviewError: null,
        },
      };

    default:
      return state;
  }
};

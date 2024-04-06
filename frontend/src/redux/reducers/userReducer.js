import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_LOADING,
  USER_SUCCESS,
  USER_ERROR,
} from "../contants/userConstant";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
    case USER_LOADING:
      return { ...state, loading: true };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
      };

    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case USER_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

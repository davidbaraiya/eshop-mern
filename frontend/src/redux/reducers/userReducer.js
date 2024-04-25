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
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CLEAR_ERRORS,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  GET_ALL_USERS_LOADING,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  DELETE_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_RESET,
  DELETE_USERS_LOADING,
  SINGLE_USER_LOADING,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_RESET,
} from "../contants/userConstant";
import Cookies from "js-cookie";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
    case USER_LOADING:
      return { ...state, loading: true, isLoggedIn: false };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      Cookies.set("auth-token", action.payload.token, { expires: 5 });
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.user,
      };

    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.user,
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

    case LOGOUT_SUCCESS:
      Cookies.remove("auth-token");
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return { ...state };
  }
};

// update profile
export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_LOADING:
      return { loading: true };

    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: action.payload };

    case UPDATE_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// change password
export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_LOADING:
      return { loading: true };

    case CHANGE_PASSWORD_SUCCESS:
      Cookies.set("auth-token", action.payload.token, { expires: 5 });
      return { loading: false, success: action.payload.success };

    case CHANGE_PASSWORD_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

///////////  admin   /////////////
const userInitialState = {
  allUsers: {
    allUsersLoading: false,
    allUsers: [],
    allUsersError: null,
  },
  singleUser: {
    singleUserLoading: false,
    singleUser: {},
    singleUserError: null,
  },
  updateUser: {
    updateUserLoading: false,
    updateUserStatus: false,
    updateUserError: null,
  },
  deleteUser: {
    deleteUserLoading: false,
    deleteUserStatus: false,
    deleteUserError: null,
  },
};

// get all users
export const adminUsersReducer = (state = userInitialState, action) => {
  switch (action.type) {
    // get all users
    case GET_ALL_USERS_LOADING:
      return {
        ...state,
        allUsers: {
          ...state.allUsers,
          allUsersLoading: true,
        },
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: {
          ...state.allUsers,
          allUsersLoading: false,
          allUsers: action.payload.users,
        },
      };

    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        allUsers: {
          ...state.allUsers,
          allUsersLoading: false,
          allUsersError: action.payload.error,
        },
      };

    // get single user
    case SINGLE_USER_LOADING:
      return {
        ...state,
        singleUser: {
          ...state.singleUser,
          singleUserLoading: true,
        },
      };

    case SINGLE_USER_SUCCESS:
      return {
        ...state,
        singleUser: {
          ...state.singleUser,
          singleUserLoading: false,
          singleUser: action.payload.user,
        },
      };

    case SINGLE_USER_ERROR:
      return {
        ...state,
        singleUser: {
          ...state.singleUser,
          singleUserLoading: false,
          singleUserError: action.payload.error,
        },
      };

    // update user
    case UPDATE_USER_LOADING:
      return {
        ...state,
        updateUser: {
          ...state.updateUser,
          updateUserLoading: true,
        },
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUser: {
          ...state.updateUser,
          updateUserLoading: false,
          updateUserStatus: action.payload.success,
        },
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUser: {
          ...state.updateUser,
          updateUserLoading: false,
          updateUserError: action.payload.error,
        },
      };

    case UPDATE_USER_RESET:
      return {
        ...state,
        updateUser: {
          updateUserLoading: false,
          updateUserStatus: false,
          updateUserError: null,
        },
      };

    /// delete
    case DELETE_USERS_LOADING:
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          deleteUserLoading: true,
        },
      };
    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          deleteUserStatus: action.payload.success,
        },
      };

    case DELETE_USERS_ERROR:
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          deleteUserStatus: false,
          deleteUserError: action.payload,
        },
      };

    case DELETE_USERS_RESET:
      return {
        ...state,
        deleteUser: {
          deleteUserStatus: false,
          deleteUserLoading: false,
          deleteUserError: null,
        },
      };

    default:
      return state;
  }
};

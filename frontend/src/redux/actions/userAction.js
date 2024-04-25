import toast from "react-hot-toast";
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
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  DELETE_USERS_LOADING,
  SINGLE_USER_LOADING,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../contants/userConstant";
import axios from "axios";

export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_LOADING });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `/api/v1/auth/register`,
      formData,
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, payload: error.response.data.message });
  }
};

export const loginAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/auth/login`, formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
  }
};

export const userAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING });
    const { data } = await axios.get(`/api/v1/auth/me`);
    dispatch({ type: USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error.response.data.message });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/v1/auth/logout/");
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
    toast.success("Logout Successfully");
  } catch (error) {
    dispatch({ type: LOGOUT_ERROR, payload: error.response.data.message });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const updateProfile = (formData) => async (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    dispatch({ type: UPDATE_PROFILE_LOADING });
    const { data } = await axios.put(
      "/api/v1/auth/me/update",
      formData,
      config
    );
    toast.success("updated successfully");
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const changePasswordAction = (formData) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data/json/application" },
  };
  try {
    dispatch({ type: CHANGE_PASSWORD_LOADING });
    const { data } = await axios.put(
      "/api/v1/auth/password/update",
      formData,
      config
    );
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

////////////  admin  //////////////
// get all users
export const getAllUsersAction = () => async (dispatch) => {
  const config = {
    headers: { "Content-Type": " json/application" },
  };
  try {
    dispatch({ type: GET_ALL_USERS_LOADING });
    const { data } = await axios.get("/api/v1/auth/admin/users", config);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all users
export const singleUserAction = (userId) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": " json/application" },
  };
  try {
    dispatch({ type: SINGLE_USER_LOADING });
    const { data } = await axios.get(
      `/api/v1/auth/admin/user/${userId}`,
      config
    );
    dispatch({ type: SINGLE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update order
export const updateUser = (userId, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/auth/admin/user/${userId}`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete users
export const deleteUsersAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USERS_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/v1/auth/admin/user/${userId}`,
      config
    );
    dispatch({
      type: DELETE_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

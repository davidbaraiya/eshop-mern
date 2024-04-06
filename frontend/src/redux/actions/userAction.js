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
import axios from "axios";

export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_LOADING });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/auth/register`,
      formData,
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_ERROR, payload: error.response.data.message });
  }
};

export const loginAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/auth/login`, formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_ERROR, payload: error.response.data.message });
  }
};

export const userAction = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING });
    const { data } = await axios.get(`/api/v1/auth/me`);
    console.log(data);
    dispatch({ type: USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
    dispatch({ type: USER_ERROR, payload: error.response.data.message });
  }
};

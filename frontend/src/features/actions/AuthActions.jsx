import { axiosInstance } from "../../config/axiosInstance";
import { setUser } from "../slices/authSlice";

export const userRegisterApi = (data) => async (dispatch) => {
  try {
    let res = await axiosInstance.post("/auth/register", data);
    if (res) {
      dispatch(setUser(res.data.user));
    }
  } catch (error) {
    console.log("Error in registration-> ", error);
  }
};

export const loginUserApi = (data) => async (dispatch) => {
  try {
    let res = await axiosInstance.post("/auth/login", data);
    if (res) {
      dispatch(setUser(res.data.user));
    }
  } catch (error) {
    console.log("Error in login-> ", error);
  }
};

export const logoutUser = (data) => async (dispatch) => {
  try {
    let res = await axiosInstance.post("/auth/logout");
    if (res) {
      console.log("Logout User");
    }
  } catch (error) {
    console.log("Error in login-> ", error);
  }
};

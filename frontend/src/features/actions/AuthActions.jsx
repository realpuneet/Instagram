import  {axiosInstance}  from "../../config/axiosInstance";
import { setUser } from "../slices/authSlice";
import { getCurrentUser } from "../../api/authApi";

export const userRegisterApi = (data) => async (dispatch) => {
  try {
    let res = await axiosInstance.post("/auth/register", data);
    if (res) {
      dispatch(setUser(res.data.user));
      return { success: true };
    }
  } catch (error) {
    console.log("Error in registration-> ", error);
    return { success: false, error: error.response?.data?.message || "Registration failed" };
  }
};

export const loginUserApi = (data) => async (dispatch) => {
  try {
    let res = await axiosInstance.post("/auth/login", data);
    if (res) {
      dispatch(setUser(res.data));
      return { success: true };
    }
  } catch (error) {
    console.log("Error in login-> ", error);
    return { success: false, error: error.response?.data?.message || "Login failed" };
  }
};
export const logoutUserApi = (data) => async (dispatch) => {
  try {
    let res = await axiosInstance.post("/auth/logout");
    if (res) {
      dispatch(setUser(null));
      console.log("Logout User");
    }
  } catch (error) {
    console.log("Error in login-> ", error);
  }
};

export const getCurrentUserApi = () => async (dispatch) => {
  try {
    const res = await getCurrentUser();
    if (res) {
      dispatch(setUser(res.user));
      console.log("Current user loaded:", res.user);
    }
  } catch (error) {
    console.log("Error getting current user:", error);
    // If error, user is not authenticated, keep state as null
  }
};




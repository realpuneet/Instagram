import { axiosInstance } from "../config/axiosInstance";

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};
import { axiosInstance } from "../config/axiosInstance";

export const getAllUsers = async (req, res) => {
    try {
        let res = await axiosInstance.get("/users");

        if(res){
            console.log("response from all users api-->", res);
            return res.data;
        }
    } catch (error) {
        console.log("Error in all users", error);
    }
}
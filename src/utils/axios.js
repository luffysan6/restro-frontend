import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://restro-backend-wfvm.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

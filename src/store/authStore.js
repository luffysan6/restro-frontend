import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

const authStore = create((set, get) => ({
  isAuth: false,
  authToken: null,
  authType: null,
  checkAuth: async () => {
    let request = await axiosInstance.get("/auth/check");

    // console.log(request);
    const { success } = request.data;

    if (success) {
      set({ isAuth: true });
      set({ authType: request.data.role });
    }
    return;
  },
  Login: async ({ email, password }) => {
    const request = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    let result = await request.data;

    if (result.success) {
      set({ isAuth: true });
      set({ authType: result.role });
    }
    return result;
  },
  Register: async ({ email, name, password }) => {
    let resposne = await fetch("http://localhost:3000/auth", {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await resposne.json();

    if (result.success) {
      set({ isAuth: true });
    }
    return result;
  },
  logout: async () => {
    const res = await axiosInstance.get("/auth/logout");
    console.log(res);
    if (res.data.success == true) {
      alert("Logout Successfully");
      window.location.replace("/");
    }
  },
}));

export default authStore;

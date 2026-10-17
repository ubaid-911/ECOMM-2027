import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

export const useAuthStore = create((set) => ({
  signIn: async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/signIn`, userData);
      localStorage.setItem("profile", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  },

  signUp: async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/signUp`, userData);
      localStorage.setItem("profile", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  },
}));

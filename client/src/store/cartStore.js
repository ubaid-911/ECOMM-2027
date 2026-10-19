import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/cart";

export const useCartStore = create((set) => ({
  cart: [],
  singleCart: null,
  userCartData: [],
  getCart: async () => {
    try {
      const { data } = await axios.get(API_URL);

      set({ cart: data });
    } catch (error) {
      console.log(error);
    }
  },

  getCartById: async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      set({ singleCart: data });
    } catch (error) {
      console.log(error);
    }
  },

  getCartByUserId: async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}`);

      const filterData = data.filter((item) => item?.userId == id);

      set({ userCartData: filterData });
    } catch (error) {
      console.log(error);
    }
  },

  createCart: async (data) => {
    try {
      const response = await axios.post(API_URL, data);

      set((state) => ({
        cart: [...state.cart, response.data[0]],
      }));
    } catch (error) {
      console.log(error);
    }
  },

  deleteCart: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      set((state) => ({
        cart: state.cart.filter((item) => item?.id != id),
      }));
    } catch (error) {
      console.log(error);
    }
  },

  updateCart: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);

      set((state) => ({
        cart: state.cart.map((item) =>
          item?.id == id ? response.data[0] : item,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

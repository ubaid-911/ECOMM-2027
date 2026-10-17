import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/products";

export const useProductsStore = create((set) => ({
  products: [],
  singleProducts: null,
  getProducts: async () => {
    try {
      const { data } = await axios.get(API_URL);

      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },

  getProductsById: async (id) => {
    console.log(id, "from Store");
    try {
      console.log("Start");
      const { data } = await axios.get(`${API_URL}/${id}`);
      set({ singleProducts: data });
    } catch (error) {
      console.log(error);
    }
  },
}));

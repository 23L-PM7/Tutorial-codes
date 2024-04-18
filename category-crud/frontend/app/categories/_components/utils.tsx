import axios from "axios";
import { create } from "zustand";

export const useCategories = create((set) => ({
  categories: null,
  setCategories: (newList: any) => set(() => ({ categories: newList })),
  loadCategories: () => {
    axios.get("http://localhost:4000/categories").then(({ data }) => {
      set(() => ({ categories: data }));
    });
  },
}));

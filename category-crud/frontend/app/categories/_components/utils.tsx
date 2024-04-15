import { create } from "zustand";

export const useCategories = create((set) => ({
  categories: [],
  setCategories: (newList: any) => set(() => ({ categories: newList })),
}));

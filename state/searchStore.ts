import { create } from "zustand";

type SearchStore = {
  searchText: string;
  setSearchText: (value: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchText: "",
  setSearchText: (value) => set({ searchText: value }),
}));

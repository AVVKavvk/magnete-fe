import { create } from "zustand";

const useStore = create((set) => ({
  students: [],
  total: 0,
  page: 1,
  limit: 10,
  token: localStorage.getItem("token") || "",
  setStudents: (students) => set({ students }),
  setTotal: (total) => set({ total }),
  setPage: (page) => set({ page }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: "" });
  },
}));

export default useStore;

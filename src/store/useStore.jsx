import { create } from "zustand";

const useAuthStore = create((set) => ({
  students: [],
  isAdmin: false,
  total: 0,
  page: 1,
  limit: 10,
  setAdmin: (isAdmin) => set({ isAdmin }),
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

export default useAuthStore;

import api from "./api.js";

export const login = (senha) => api.post("/auth/login", { senha });
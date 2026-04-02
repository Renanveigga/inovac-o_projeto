import api from "./api.js";

export const login = async (senha) => {
  const res = await api.post("/auth/login", { senha });

  localStorage.setItem("token", res.data.token);

  return res;
};
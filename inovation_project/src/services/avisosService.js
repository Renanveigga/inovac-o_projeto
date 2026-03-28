import api from "./api.js";

export const getAvisos    = () => api.get("/avisos");
export const createAviso  = (dados) => api.post("/avisos", dados);
export const deleteAviso  = (id) => api.delete(`/avisos/${id}`);
import api from "./api.js";
export const buscar = (q) => api.get(`/busca?q=${encodeURIComponent(q)}`);
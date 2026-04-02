import api from "./api.js";

export const getEsportes   = () => api.get("/esportes");
export const deleteEsporte = (id) => api.delete(`/esportes/${id}`);
export const createEsporte = (formData) =>
  api.post("/esportes", formData, { headers: { "Content-Type": "multipart/form-data" } });
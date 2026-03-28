import api from "./api.js";

export const getCursos   = () => api.get("/cursos");
export const getCursoById = (id) => api.get(`/cursos/${id}`);
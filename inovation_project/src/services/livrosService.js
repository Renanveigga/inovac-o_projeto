import api from "./api.js";

export const getLivros    = () => api.get("/livros");
export const createLivro  = (dados) => api.post("/livros", dados);
export const updateLivro  = (id, dados) => api.put(`/livros/${id}`, dados);
export const deleteLivro  = (id) => api.delete(`/livros/${id}`);
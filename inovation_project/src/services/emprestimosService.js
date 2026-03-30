import api from "./api.js";

export const getEmprestimos   = () => api.get("/emprestimos");
export const createEmprestimo = (dados) => api.post("/emprestimos", dados);
export const devolverLivro    = (id) => api.put(`/emprestimos/${id}`);
export const deleteEmprestimo = (id) => api.delete(`/emprestimos/${id}`);
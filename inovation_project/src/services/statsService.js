import api from "./api.js";
export const getStats = () => api.get("/stats");
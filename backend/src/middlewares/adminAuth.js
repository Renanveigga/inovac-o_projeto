import jwt from "jsonwebtoken";
import { protegerAdmin } from "../middlewares/adminAuth.js";

export function protegerAdmin(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: "Sem token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.admin) {
      return res.status(403).json({ erro: "Acesso negado" });
    }

    next();
  } catch {
    return res.status(403).json({ erro: "Token inválido" });
  }
}
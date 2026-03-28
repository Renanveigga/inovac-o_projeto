import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.post("/login", (req, res) => {
  const { senha } = req.body;

  if (senha === process.env.ADMIN_SENHA) {
    res.json({ autenticado: true, token: "admin-logado" });
  } else {
    res.status(401).json({ autenticado: false, erro: "Senha incorreta" });
  }
});

export default router;
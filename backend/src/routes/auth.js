import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { senha } = req.body;

  const senhaValida = await bcrypt.compare(
    senha,
    process.env.ADMIN_PASSWORD
  );

  if (!senhaValida) {
    return res.status(401).json({ erro: "Senha inválida" });
  }

  const token = jwt.sign(
    { admin: true },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});


export default router;
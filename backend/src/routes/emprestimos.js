import { Router } from "express";
import {
  getEmprestimos,
  createEmprestimo,
  devolverLivro,
  deleteEmprestimo,
} from "../controllers/emprestimosController.js";

const router = Router();
router.get("/",           getEmprestimos);
router.post("/",          createEmprestimo);
router.put("/:id",        devolverLivro);
router.delete("/:id",     deleteEmprestimo);
export default router;
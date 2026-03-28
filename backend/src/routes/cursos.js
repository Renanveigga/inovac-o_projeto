import { Router } from "express";
import {
  getCursos,
  getCursoById,
} from "../controllers/cursosController.js";

const router = Router();

router.get("/", getCursos);
router.get("/:id", getCursoById);

export default router;
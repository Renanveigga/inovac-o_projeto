import { Router } from "express";
import {
  getAchados,
  getAchadoById,
  createAchado,
  updateAchado,
  deleteAchado,
} from "../controllers/achadosController.js";
import upload from "../config/upload.js";

const router = Router();

router.get("/",     getAchados);
router.get("/:id",  getAchadoById);
router.post("/",    upload.single("foto"), createAchado); // "foto" é o nome do campo
router.put("/:id",  updateAchado);
router.delete("/:id", deleteAchado);

export default router;
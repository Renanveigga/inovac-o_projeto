import { Router } from "express";
import {
  getAvisos,
  getAvisoById,
  createAviso,
  deleteAviso,
} from "../controllers/avisosController.js";

const router = Router();

router.get("/", getAvisos);           
router.get("/:id", getAvisoById);      
router.post("/", createAviso);         
router.delete("/:id", deleteAviso);    

export default router;
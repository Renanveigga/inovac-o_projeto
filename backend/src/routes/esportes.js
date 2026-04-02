import { Router } from "express";
import multer from "multer";
import path from "path";
import { getEsportes, createEsporte, deleteEsporte } from "../controllers/esportesController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename:    (req, file, cb) => cb(null, `esporte_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();
router.get("/",        getEsportes);
router.post("/",       upload.single("foto"), createEsporte);
router.delete("/:id",  deleteEsporte);
export default router;
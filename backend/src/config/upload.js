import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = `achado_${Date.now()}${ext}`;
    cb(null, nome);
  },
});

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens JPG, PNG ou WEBP são permitidas."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;
import express from "express";
import upload from "../middleware/multer.js";
import { uploadFile, downloadFile, deleteFile } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:key", downloadFile);
router.delete("/delete/:key", deleteFile);

export default router;

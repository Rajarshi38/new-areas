import { Router } from "express";
import asyncHandler from "express-async-handler";
import Image from "../models/imageModel.js";

const router = Router();

router.post(
  "/upload",
  asyncHandler(async (req, res) => {
    const { file } = req.body;
    const newFile = await Image.create(file);
    res.status(200).json({
      message: "Image uploaded successfully",
      file: newFile,
    });
  })
);

export default router;

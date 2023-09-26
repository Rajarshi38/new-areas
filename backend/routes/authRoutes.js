import { Router } from "express";
import { loginUser, logout, signup } from "../controllers/authController.js";

const router = Router();

router.post("/auth/login", loginUser);

router.post("/auth/signup", signup);

router.post("/auth/logout", logout);

export default router;

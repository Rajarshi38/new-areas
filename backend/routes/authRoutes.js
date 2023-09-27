import { Router } from "express";
import {
  loginUser,
  logout,
  signup,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/auth/login", loginUser);

router.post("/auth/signup", signup);

router.post("/auth/logout", logout);

router
  .route("/auth/profile")
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;

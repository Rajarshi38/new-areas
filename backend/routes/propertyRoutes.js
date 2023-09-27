import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addProperty,
  deleteProperty,
  getAllProperties,
  getUserProperties,
  updateProperty,
} from "../controllers/propertyController.js";

const router = Router();

router.get("/list-properties", getAllProperties);
router
  .route("/property")
  .post(protect, addProperty)
  .get(protect, getUserProperties);
router
  .route("/property/:id")
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

export default router;

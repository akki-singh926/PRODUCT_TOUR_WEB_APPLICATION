import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
  addStep,
} from "../controllers/tourController.js";

const router = express.Router();

// Multer config for step uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/steps");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Tour CRUD routes
router.post("/", protect, createTour);
router.get("/", protect, getTours);
router.get("/:id", getTourById);
router.put("/:id", protect, updateTour);
router.delete("/:id", protect, deleteTour);

// Add step to a tour (upload video)
router.post("/:id/steps", protect, upload.single("video"), (req, res, next) => {
  console.log("Route hit:", req.params.id);
  next();
}, addStep);

export default router;

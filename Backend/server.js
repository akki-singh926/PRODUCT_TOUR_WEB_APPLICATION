import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files (videos/images)
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

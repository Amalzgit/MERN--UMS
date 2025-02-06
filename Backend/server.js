import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoute.js";
import userRoutes from "./src/routes/userRoute.js";
import adminRoutes from "./src/routes/adminRoutes.js"
import { uploadDir } from "./src/utils/multer.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static(uploadDir));
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/admin",adminRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);

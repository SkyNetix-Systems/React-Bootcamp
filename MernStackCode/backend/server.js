import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST be first

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectToServer } from "./connect.js";
import posts from "./postRoutes.js";
import users from "./userRoutes.js";
import awsRoutes from "./awsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global safety logs
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥", err);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("🚀 MERN Backend (S3 mode) is running...");
});

// API routes
app.use("/posts", posts);
app.use("/users", users);
app.use("/aws", awsRoutes);

// 404 handler (must be LAST)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ message: "Internal Server Error 💥" });
});

// Start server after DB connect
(async () => {
  try {
    await connectToServer();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("☁️ Image storage: AWS S3");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();

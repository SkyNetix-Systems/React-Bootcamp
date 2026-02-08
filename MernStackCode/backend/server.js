import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import postRoutes from "./postRoutes.js";
import users from "./userRoutes.js";
import awsRoutes from "./awsRoutes.js";
import * as connect from "./connect.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

app.use(cors());

// Multer route BEFORE JSON parsers
app.post("/images", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(201).json({
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(postRoutes);
app.use(users);
app.use(awsRoutes);

app.listen(PORT, async () => {
  await connect.connectToServer();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

dotenv.config();

const awsRoutes = express.Router();
const upload = multer(); // ✅ attach multer here
const s3Bucket = "fullstackblogstorage";

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// #1 – Retrieve one image
// GET http://localhost:3000/images/:id
awsRoutes.get("/images/:id", verifyToken, async (req, res) => {
  try {
    const bucketParams = {
      Bucket: s3Bucket,
      Key: req.params.id,
    };

    const data = await s3Client.send(new GetObjectCommand(bucketParams));

    const base64 = await data.Body.transformToString("base64");
    const imageSource = `data:${data.ContentType};base64,${base64}`;

    res.status(200).json(imageSource);
  } catch (error) {
    console.error("GET IMAGE ERROR:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
});

// #2 – Upload image (FIXED)
// POST http://localhost:3000/images
awsRoutes.post(
  "/images",
  verifyToken,
  upload.single("image"), // ✅ THIS IS THE KEY
  async (req, res) => {
    try {
      const file = req.file; // ✅ correct

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const bucketParams = {
        Bucket: s3Bucket,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(bucketParams));

      res.status(200).json({
        success: true,
        imageId: file.originalname,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  },
);

// 🔐 JWT Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

export default awsRoutes;

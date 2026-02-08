import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";

const router = express.Router();

if (
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error("❌ AWS credentials are missing in .env");
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(null, `blog-images/${crypto.randomUUID()}.${ext}`);
    },
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
});

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    imageKey: req.file.key,
    imageUrl: req.file.location, // optional direct use
  });
});

export default router;

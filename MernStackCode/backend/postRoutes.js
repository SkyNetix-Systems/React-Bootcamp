import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { getDb } from "./connect.js";
import { ObjectId } from "mongodb";

const router = express.Router();

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

// 🔥 CREATE POST
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const post = {
      title,
      description,
      content,
      imageId: req.file.key,
      imageUrl: req.file.location,
      dateCreated: new Date(),
    };

    const db = getDb();
    const result = await db.collection("posts").insertOne(post);

    res.status(201).json({ ...post, _id: result.insertedId });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
});

// 🔥 GET POSTS
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const posts = await db
      .collection("posts")
      .find()
      .sort({ dateCreated: -1 })
      .toArray();
    res.json(posts);
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// 🔥 GET SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("GET POST ERROR:", err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

export default router;

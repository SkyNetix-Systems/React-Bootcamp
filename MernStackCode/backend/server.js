import express from "express";
import cors from "cors";
import multer from "multer";

import * as connect from "./connect.js";
import posts from "./postRoutes.js";
import users from "./userRoutes.js";
import awsRoutes from "./awsRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const upload = multer();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(upload.any());

app.use(posts);
app.use(users);
app.use(awsRoutes);

app.listen(PORT, async () => {
  await connect.connectToServer();
  console.log(`🚀 Server is running on port ${PORT}`);
});

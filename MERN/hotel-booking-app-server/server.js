import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically import all route files
const loadRoutes = async () => {
    const routeFiles = fs.readdirSync(path.join(__dirname, "routes"));
    for (const file of routeFiles) {
        if (file.endsWith(".js")) {
            const route = await import(`./routes/${file}`);
            app.use("/api", route.default);
            console.log(`Loaded route: ${file}`);
        }
    }
};

loadRoutes().then(() => {
    app.listen(PORT, () => console.log("Server listening on port " + PORT));
});

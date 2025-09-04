// server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically load all route files from "routes" folder
const loadRoutes = async () => {
    const routeFiles = fs.readdirSync(path.join(__dirname, "routes"));
    for (const file of routeFiles) {
        if (file.endsWith(".js")) {
            const routeModule = await import(`./routes/${file}`);
            if (routeModule.default) {
                app.use("/api", routeModule.default);
                console.log(`Loaded route: ${file}`);
            }
        }
    }
};

loadRoutes().then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

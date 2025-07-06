import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 8000;

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

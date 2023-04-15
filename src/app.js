import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();
const app = express();

// __dirname

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 4000);

// static files
app.use(express.static(path.join(__dirname, "public")));

export default app;

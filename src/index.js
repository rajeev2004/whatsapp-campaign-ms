// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import templatesRouter from "./routes/templates.js";
import campaignsRouter from "./routes/campaigns.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => res.json({ ok: true, service: "campaign-ms" }));

// routes
app.use("/templates", templatesRouter);
app.use("/campaigns", campaignsRouter);

// connect DB then start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import gameRoutes from "./routes/gameRoutes.js";
import guestbookRoutes from "./routes/guestbookRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB 연결
connectDB();

// API
app.use("/api/games", gameRoutes);
app.use("/api/guestbook", guestbookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
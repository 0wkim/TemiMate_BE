// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import gameRoutes from "./routes/gameRoutes.js";
import guestbookRoutes from "./routes/guestbookRoutes.js";

dotenv.config(); // .env 로딩

const app = express();

/* 1. CORS 설정 */
const allowedOrigins = [
  "https://temi-project.vercel.app",
  "https://temimate.kwidea.com",
  "https://appassets.androidplatform.net", // Temi WebView
  "http://localhost:5173", // Vite dev
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://192.168.25.62:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      // origin이 없을 때(POSTMAN 등)도 허용
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS 차단:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ★ 여기서 더 이상 app.options("*", ...) 같은 건 안 쓴다.

/* 2. JSON 파서 */
app.use(express.json());

/* 3. DB 연결 */
connectDB();

/* 4. API 라우터 */
app.use("/api/games", gameRoutes);
app.use("/api/guestbook", guestbookRoutes);

/* 5. 서버 실행 */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

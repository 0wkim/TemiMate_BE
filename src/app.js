import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import gameRoutes from "./routes/gameRoutes.js";
import guestbookRoutes from "./routes/guestbookRoutes.js";

dotenv.config();

const app = express();

/* ----------------------------------------------------
   🔥 1. Temi + 브라우저 CORS 허용 설정
---------------------------------------------------- */

const allowedOrigins = [
  "https://appassets.androidplatform.net", // Temi WebView origin
  "http://localhost:5173", // Vite 개발 서버
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin(origin, callback) {
      // origin이 null(POSTMAN 등)일 때도 허용
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS 차단:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Preflight OPTIONS 허용
app.options("*", cors());

/* ----------------------------------------------------
   🔥 2. JSON 파서
---------------------------------------------------- */
app.use(express.json());

/* ----------------------------------------------------
   🔥 3. DB 연결
---------------------------------------------------- */
connectDB();

/* ----------------------------------------------------
   🔥 4. API 라우터
---------------------------------------------------- */
app.use("/api/games", gameRoutes);
app.use("/api/guestbook", guestbookRoutes);

/* ----------------------------------------------------
   🔥 5. 서버 구동
---------------------------------------------------- */
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

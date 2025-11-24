// src/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

export async function connectDB() {
  try {
    console.log("📡 MONGODB_URI =", uri);
    await mongoose.connect(uri, {
      // 필요하면 옵션 추가
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
}

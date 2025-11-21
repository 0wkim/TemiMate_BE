import express from "express";
import Guestbook from "../models/Guestbook.js";

const router = express.Router();

// 1. 방명록 작성 (POST)
router.post("/", async (req, res) => {
  try {
    const { nickname, content } = req.body;

    // 데이터 생성
    const newBook = await Guestbook.create({ nickname, content });

    // 성공 응답 (방금 저장한 데이터 반환)
    res.json({ success: true, data: newBook });
  } catch (err) {
    console.error("저장 에러:", err);
    res.status(400).json({ success: false, error: err.message });
  }
});

// 2. 방명록 전체 조회 (GET)
router.get("/", async (req, res) => {
  try {
    // 최신순 정렬
    const list = await Guestbook.find().sort({ created_at: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error("조회 에러:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

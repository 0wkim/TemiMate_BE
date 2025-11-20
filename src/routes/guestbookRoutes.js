import express from "express";
import Guestbook from "../models/Guestbook.js";

const router = express.Router();

// 방명록 작성
router.post("/", async (req, res) => {
  try {
    const { nickname, content } = req.body;

    const newBook = await Guestbook.create({ nickname, content });

    res.json({ success: true, data: newBook });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 방명록 전체 조회
router.get("/", async (req, res) => {
  const list = await Guestbook.find().sort({ created_at: -1 });
  res.json(list);
});

export default router;
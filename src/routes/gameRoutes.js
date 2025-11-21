import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

// 게임 만족도 제출
router.post("/", async (req, res) => {
  try {
    const { game_id, survey } = req.body;

    const game = await Game.create({ game_id, survey });

    res.json({ success: true, game });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;

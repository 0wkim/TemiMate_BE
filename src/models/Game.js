import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    game_id: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
    },
    survey: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
    }
  }
);

export default mongoose.model("Game", gameSchema);
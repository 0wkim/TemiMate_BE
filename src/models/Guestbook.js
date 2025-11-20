import mongoose from "mongoose";

const guestbookSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // yyyy-mm-dd hh:mm 형태로 저장됨
  }
});

export default mongoose.model("Guestbook", guestbookSchema);
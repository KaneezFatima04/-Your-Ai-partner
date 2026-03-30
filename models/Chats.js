import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // The ID from your login system
  messages: [
    {
      role: { type: String, enum: ["user", "bot"], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
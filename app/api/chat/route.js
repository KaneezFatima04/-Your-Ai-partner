import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/dbConnect"; // Your DB connection utility
import Chat from "@/models/Chats";

export async function POST(req) {
  try {
    await dbConnect();
    const { message, userId } = await req.json(); // Get userId from frontend

    // 1. Get Gemini Response
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const aiReply = response.text();

    // 2. Save to MongoDB
    // We "upsert" (update if exists, insert if not) the chat for this user
    await Chat.findOneAndUpdate(
      { userId: userId }, 
      { 
        $push: { 
          messages: [
            { role: "user", text: message },
            { role: "bot", text: aiReply }
          ] 
        } 
      },
      { upsert: true, new: true }
    );

    return Response.json({ reply: aiReply });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/dbConnect";
import Chat from "@/models/Chats";

export async function POST(req) {
  try {
    await dbConnect();
    const { message, userId } = await req.json();

    // 👉 Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
  You are Pengu 🐧, a friendly and smart chat buddy.
  
  Rules:
  - Do NOT introduce yourself in every message.
  - Only introduce yourself when the user asks questions like:
    "who are you", "what is your name", "tell me about yourself"
  
  - If asked "who are you", reply: "I am Pengu, your chat buddy 🐧".
  - If asked your name, reply: "My name is Pengu 🐧".
  - If asked your purpose, reply: "I’m here to help you, chat with you, and make things easier for you 😄".
  
  - For all other messages:
    → Respond normally without introducing yourself.
  
  - Never mention Google, Gemini, or that you are an AI model.
  - Keep responses friendly, simple, and slightly casual.
  - You are helpful, fun, and human-like.
`
    });

    // 👉 Send user message
    const result = await model.generateContent(message);
    const response = await result.response;
    const aiReply = response.text();

    // 👉 Save to MongoDB
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
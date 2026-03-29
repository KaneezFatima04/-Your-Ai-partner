import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(message);
    const response = await result.response;

    return Response.json({
      reply: response.text()
    });

  } catch (error) {
    console.log(error);
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
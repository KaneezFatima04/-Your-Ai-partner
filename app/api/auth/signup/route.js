import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password, nickname } = await req.json();

    if (!email || !password || !nickname) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const client = await connectDB();
    const db = client.db("Pengu");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      nickname,
    });

    // Issue JWT immediately
    const token = jwt.sign(
      { userId: result.insertedId, email, nickname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({ message: "Signup successful", token, nickname }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
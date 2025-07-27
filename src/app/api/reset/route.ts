import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    
    if (!user) {
      // Don't reveal if email exists or not
      return NextResponse.json({ 
        message: "If this email exists, a reset link has been sent." 
      });
    }

    // Generate reset token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    // Store reset token
    await db.collection("password_resets").insertOne({
      userId: user._id,
      token,
      expires,
      createdAt: new Date(),
    });

    // In a real application, you would send an email here
    // For now, we'll just log the reset link
    console.log(`Reset link: http://localhost:3000/reset/${token}`);

    return NextResponse.json({ 
      message: "If this email exists, a reset link has been sent." 
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { message: "Password reset failed. Please try again." },
      { status: 500 }
    );
  }
}
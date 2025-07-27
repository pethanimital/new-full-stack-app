import { ObjectId } from "mongodb";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { token: string } }) {
  try {
    const { token } = params;
    const { password } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Find the reset token
    const reset = await db.collection("password_resets").findOne({ token });

    if (!reset) {
      return NextResponse.json(
        { error: "Invalid reset token" },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (reset.expires < new Date()) {
      // Clean up expired token
      await db.collection("password_resets").deleteOne({ _id: reset._id });
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 12);

    // Update user's password
    await db.collection("users").updateOne(
      { _id: new ObjectId(reset.userId) },
      { $set: { password: hashedPassword } }
    );

    // Delete the used reset token
    await db.collection("password_resets").deleteOne({ _id: reset._id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Password reset failed" },
      { status: 500 }
    );
  }
}
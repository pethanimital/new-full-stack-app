import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, role = "user" } = await req.json();
    
    if (!name || !email || !password) {
      return NextResponse.json({
        error: "Name, email, and password are required"
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (existingUser) {
      return NextResponse.json({
        error: "User already exists",
        user: {
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role
        }
      }, { status: 409 });
    }
    
    // Create new user
    const hashedPassword = await hash(password, 12);
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection("users").insertOne(newUser);
    
    return NextResponse.json({
      success: true,
      message: `User ${email} created successfully`,
      userId: result.insertedId,
      user: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
    
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({
      error: "Failed to create user"
    }, { status: 500 });
  }
} 
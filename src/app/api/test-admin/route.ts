import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email, password, name, role = "user" } = await req.json();
    
    const client = await clientPromise;
    const db = client.db();
    
    // Check if user already exists
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ 
        error: "User already exists",
        existingUser: { email: existing.email, role: existing.role }
      }, { status: 409 });
    }
    
    // Hash password
    const hashedPassword = await hash(password, 12);
    
    // Create user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });
    
    return NextResponse.json({ 
      success: true, 
      userId: result.insertedId,
      message: `User created with role: ${role}`
    });
    
  } catch (error) {
    console.error("Error creating test user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const users = await db.collection("users").find({}, { projection: { password: 0 } }).toArray();
    
    return NextResponse.json({ 
      users,
      count: users.length,
      message: "Current users in database"
    });
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
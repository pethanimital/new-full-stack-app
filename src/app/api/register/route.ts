import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    console.log("Registration request received");
    
    // Parse request body
    const body = await req.json();
    console.log("Request body:", { ...body, password: "[HIDDEN]" });
    
    const { name, email, password } = body;
    
    // Basic validation
    if (!name || !email || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    console.log("Attempting to connect to MongoDB...");
    const client = await clientPromise;
    console.log("Connected to MongoDB");
    
    const db = client.db();
    console.log("Database name:", db.databaseName);
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }
    
    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await hash(password, 12);
    console.log("Password hashed successfully");
    
    // Create user object
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "user", // Default role
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log("Inserting user into database...");
    const result = await db.collection("users").insertOne(newUser);
    console.log("User created successfully with ID:", result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      userId: result.insertedId,
      message: "Registration successful"
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes("MongoDB")) {
        return NextResponse.json(
          { error: "Database connection failed. Please try again." },
          { status: 500 }
        );
      }
      
      if (error.message.includes("bcrypt")) {
        return NextResponse.json(
          { error: "Password processing failed. Please try again." },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
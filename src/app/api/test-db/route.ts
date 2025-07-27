import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Testing MongoDB connection...");
    
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ 
        error: "MONGODB_URI environment variable is not set",
        solution: "Please add MONGODB_URI to your .env.local file"
      }, { status: 500 });
    }

    console.log("MONGODB_URI is set, attempting connection...");
    const client = await clientPromise;
    console.log("Successfully connected to MongoDB");
    
    const db = client.db();
    console.log("Database name:", db.databaseName);
    
    // Test basic operations
    const collections = await db.listCollections().toArray();
    console.log("Collections found:", collections.length);
    
    // Test if we can access the users collection
    const usersCollection = db.collection("users");
    const userCount = await usersCollection.countDocuments();
    
    return NextResponse.json({ 
      success: true, 
      databaseName: db.databaseName,
      collections: collections.length,
      usersCount: userCount,
      message: "Database connection successful"
    });
  } catch (error) {
    console.error('Database connection error:', error);
    
    let errorMessage = "Database connection failed";
    let solution = "Check your MONGODB_URI in .env.local";
    
    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "Cannot connect to MongoDB server";
        solution = "Check if your MongoDB URI is correct and server is running";
      } else if (error.message.includes("Authentication failed")) {
        errorMessage = "MongoDB authentication failed";
        solution = "Check your username and password in MONGODB_URI";
      } else if (error.message.includes("ENOTFOUND")) {
        errorMessage = "MongoDB host not found";
        solution = "Check your cluster name in MONGODB_URI";
      }
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      solution: solution,
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
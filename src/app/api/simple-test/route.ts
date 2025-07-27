import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    console.log("Starting simple MongoDB connection test...");
    
    const uri = process.env.MONGODB_URI;
    console.log("MongoDB URI starts with:", uri?.substring(0, 50) + "...");
    
    if (!uri) {
      return NextResponse.json({
        error: "MONGODB_URI is not set"
      }, { status: 500 });
    }

    console.log("Attempting to connect...");
    const client = new MongoClient(uri);
    
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    
    const db = client.db();
    console.log("Database name:", db.databaseName);
    
    // Test a simple operation
    const collections = await db.listCollections().toArray();
    console.log("Collections found:", collections.length);
    
    await client.close();
    console.log("Connection closed successfully");
    
    return NextResponse.json({
      success: true,
      message: "MongoDB connection successful",
      databaseName: db.databaseName,
      collectionsCount: collections.length
    });
    
  } catch (error) {
    console.error("Simple test error:", error);
    
    return NextResponse.json({
      error: "MongoDB connection failed",
      details: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
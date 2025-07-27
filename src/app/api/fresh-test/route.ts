import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("=== FRESH MONGODB CONNECTION TEST ===");
    
    // Get the URI directly from environment
    const uri = process.env.MONGODB_URI;
    console.log("Environment MONGODB_URI:", uri ? "SET" : "NOT SET");
    
    if (!uri) {
      return NextResponse.json({
        error: "MONGODB_URI is not set in environment"
      }, { status: 500 });
    }

    // Check if it's the correct format
    if (!uri.includes("mongodb+srv://")) {
      return NextResponse.json({
        error: "MONGODB_URI is not in the correct format",
        hasMongoSrv: uri.includes("mongodb+srv://"),
        uriStart: uri.substring(0, 30) + "..."
      }, { status: 500 });
    }

    // Check if it contains the correct cluster
    if (!uri.includes("fullstack-cluster.v6ykayz.mongodb.net")) {
      return NextResponse.json({
        error: "MONGODB_URI does not contain the correct cluster",
        hasCorrectCluster: uri.includes("fullstack-cluster.v6ykayz.mongodb.net"),
        uriStart: uri.substring(0, 50) + "..."
      }, { status: 500 });
    }

    console.log("URI format is correct, attempting connection...");
    
    // Import MongoClient dynamically
    const { MongoClient } = await import("mongodb");
    
    console.log("Creating new MongoClient...");
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log("Attempting to connect...");
    await client.connect();
    console.log("Connection successful!");
    
    const db = client.db();
    console.log("Database name:", db.databaseName);
    
    // Test a simple operation
    const collections = await db.listCollections().toArray();
    console.log("Collections found:", collections.length);
    
    await client.close();
    console.log("Connection closed");
    
    return NextResponse.json({
      success: true,
      message: "Fresh MongoDB connection successful",
      databaseName: db.databaseName,
      collectionsCount: collections.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Fresh test error:", error);
    
    let errorMessage = "MongoDB connection failed";
    let solution = "Check MongoDB Atlas settings";
    
    if (error instanceof Error) {
      if (error.message.includes("ETIMEDOUT")) {
        errorMessage = "Connection timeout";
        solution = "Check Network Access in MongoDB Atlas - add 0.0.0.0/0";
      } else if (error.message.includes("Authentication failed")) {
        errorMessage = "Authentication failed";
        solution = "Check Database Access permissions in MongoDB Atlas";
      } else if (error.message.includes("ENOTFOUND")) {
        errorMessage = "Host not found";
        solution = "Check your cluster name in the connection string";
      }
    }
    
    return NextResponse.json({
      error: errorMessage,
      solution: solution,
      details: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
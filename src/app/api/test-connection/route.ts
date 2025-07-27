import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Log the environment variable (without password for security)
    const mongoUri = process.env.MONGODB_URI;
    const uriStart = mongoUri ? mongoUri.substring(0, 50) + "..." : "NOT SET";
    
    console.log("MONGODB_URI starts with:", uriStart);
    
    if (!mongoUri) {
      return NextResponse.json({
        error: "MONGODB_URI is not set",
        solution: "Check your .env.local file"
      }, { status: 500 });
    }

    // Test if it's the correct format
    if (!mongoUri.includes("mongodb+srv://")) {
      return NextResponse.json({
        error: "MONGODB_URI format is incorrect",
        current: uriStart,
        expected: "mongodb+srv://username:password@cluster.mongodb.net/database"
      }, { status: 500 });
    }

    // Test if it contains the correct cluster
    if (!mongoUri.includes("fullstack-cluster.v6ykayz.mongodb.net")) {
      return NextResponse.json({
        error: "MONGODB_URI doesn't contain the correct cluster",
        current: uriStart,
        expected: "Should contain: fullstack-cluster.v6ykayz.mongodb.net"
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "MONGODB_URI format is correct",
      uriStart: uriStart,
      hasCorrectFormat: mongoUri.includes("mongodb+srv://"),
      hasCorrectCluster: mongoUri.includes("fullstack-cluster.v6ykayz.mongodb.net"),
      hasDatabase: mongoUri.includes("fullstackapp")
    });

  } catch (error) {
    return NextResponse.json({
      error: "Failed to check MONGODB_URI",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 
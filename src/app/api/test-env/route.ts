import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envCheck = {
      mongodbUri: process.env.MONGODB_URI ? "✅ Set" : "❌ Missing",
      nextauthSecret: process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing",
      nextauthUrl: process.env.NEXTAUTH_URL ? "✅ Set" : "❌ Missing",
      googleClientId: process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing",
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing",
      nodeEnv: process.env.NODE_ENV || "development"
    };

    return NextResponse.json({
      message: "Environment variables check",
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to check environment variables",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
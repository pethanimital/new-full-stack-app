import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and has admin role
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" }, 
        { status: 403 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch audit logs
    const logs = await db.collection("audit_logs")
      .find({})
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({ 
      logs,
      count: logs.length,
      message: "Audit logs fetched successfully"
    });
    
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit logs" }, 
      { status: 500 }
    );
  }
}
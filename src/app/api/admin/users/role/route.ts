import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { logAuditEvent } from "@/lib/audit";
import { notifyAdminAction } from "@/lib/notifications";

export async function PATCH(req: Request) {
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

    // Get the request body
    const { userId, newRole } = await req.json();
    
    // Validate the new role
    if (!["admin", "user"].includes(newRole)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'admin' or 'user'" }, 
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // EDGE CASE 1: Prevent self-demotion
    if (session.user.id === userId && newRole !== "admin") {
      return NextResponse.json(
        { error: "Admins cannot demote themselves" },
        { status: 400 }
      );
    }

    // EDGE CASE 2: Prevent removal of the last admin
    if (newRole !== "admin") {
      // Count total admins
      const adminCount = await db.collection("users").countDocuments({ role: "admin" });
      
      // Get the target user's current role
      const targetUser = await db.collection("users").findOne(
        { _id: new ObjectId(userId) },
        { projection: { role: 1 } }
      );
      
      // If this user is currently an admin and we're demoting them
      if (targetUser?.role === "admin" && adminCount === 1) {
        return NextResponse.json(
          { error: "Cannot demote the last remaining admin" },
          { status: 400 }
        );
      }
    }
    
    // Get the target user's current role for audit logging
    const targetUser = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { role: 1 } }
    );
    
    // Update the user's role
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      );
    }

    // Log the audit event
    await logAuditEvent({
      actorId: session.user.id,
      action: "UPDATE_ROLE",
      targetUserId: userId,
      details: {
        previousRole: targetUser?.role || "unknown",
        newRole,
      },
    });

    // Send notifications for high-risk actions
    if (newRole !== targetUser?.role) {
      await notifyAdminAction("ROLE_UPDATE", {
        actor: session.user.email,
        target: userId,
        previousRole: targetUser?.role || "unknown",
        newRole,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `User role updated to ${newRole}`,
      role: newRole
    });
    
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { 
        error: "Failed to update user role",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
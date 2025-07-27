"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Check if user is authenticated and has admin role
  const userRole = (session?.user as any)?.role;
  if (!session || !session.user || userRole !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            {!session 
              ? "Please log in to access this area." 
              : "You need admin privileges to access this area."
            }
          </p>
          {!session && (
            <Link 
              href="/login" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Login
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, {session.user?.name || session.user?.email}
          </p>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
            <Link 
              href="/admin/users"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 mb-3"
            >
              Manage Users
            </Link>
            <p className="text-sm text-gray-600">
              View and manage user accounts and roles
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts Management</h2>
            <Link 
              href="/admin/posts"
              className="block w-full bg-purple-600 text-white text-center py-3 rounded hover:bg-purple-700 mb-3"
            >
              Manage Posts
            </Link>
            <p className="text-sm text-gray-600">
              View, edit, and delete all posts in the system
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Logs</h2>
            <Link 
              href="/admin/audit"
              className="block w-full bg-green-600 text-white text-center py-3 rounded hover:bg-green-700 mb-3"
            >
              View Audit Logs
            </Link>
            <p className="text-sm text-gray-600">
              Check system audit logs and admin actions
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {session.user?.email}</p>
            <p><span className="font-medium">Role:</span> {userRole}</p>
            <p><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
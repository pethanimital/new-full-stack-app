"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = useParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (password !== confirmPassword) {
      setStatus("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setStatus("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Password updated successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setStatus(data.error || "Reset failed. Please try again.");
      }
    } catch (error) {
      setStatus("Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-semibold mb-4">Set a New Password</h1>
      <p className="text-gray-600 mb-6">
        Enter your new password below.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {status && (
          <div className={`p-3 rounded ${
            status.includes("successfully") 
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {status}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Back to login
        </a>
      </p>
    </main>
  );
}
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type UserWithImage = {
  id: string;
  email: string;
  name: string;
  role?: string;
  image?: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Editable fields (in-memory only)
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [editMode, setEditMode] = useState(false);

  // Type assertion to allow .image property if present
  const user = session?.user as UserWithImage | undefined;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (user) {
      setName(user.name || "");
      setBio("");
      setLocation("");
      setWebsite("");
    }
  }, [status, router, user]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-gray-600 text-lg">Access denied. Please login.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white shadow-lg">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "?"}
              </div>
            )}
          </div>
          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{name || user?.email}</h1>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{user?.role || "User"}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Active</span>
            </div>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              onClick={() => setEditMode((v) => !v)}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Editable Info */}
        <div className="mb-8">
          {editMode ? (
            <form
              className="space-y-4"
              onSubmit={e => { e.preventDefault(); setEditMode(false); }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              {bio && <p className="text-gray-700"><span className="font-semibold">Bio:</span> {bio}</p>}
              {location && <p className="text-gray-700"><span className="font-semibold">Location:</span> {location}</p>}
              {website && <p className="text-gray-700"><span className="font-semibold">Website:</span> <a href={website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{website}</a></p>}
              {!bio && !location && !website && (
                <p className="text-gray-400">No additional profile info added yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-700 mb-1">{user?.role || "User"}</div>
            <div className="text-gray-600 text-sm">Role</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-700 mb-1">Active</div>
            <div className="text-gray-600 text-sm">Status</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-700 mb-1">{user?.email ? new Date().getFullYear() : "-"}</div>
            <div className="text-gray-600 text-sm">Member Since</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-end">
          <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">Dashboard</Link>
          <Link href="/posts" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm">Posts</Link>
          {user?.role === "admin" && (
            <Link href="/admin" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors text-sm">Admin Panel</Link>
          )}
        </div>
      </div>
    </div>
  );
}
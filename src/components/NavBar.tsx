"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">$</span>
            </div>
            <span className="text-white font-bold text-xl">StockAstic</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              href="/posts" 
              className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Posts
            </Link>
            {session && (
              <Link 
                href="/dashboard" 
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
            )}
            {session && session.user.role === "admin" && (
              <Link 
                href="/admin" 
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                Admin
              </Link>
            )}
          </div>
         <Link 
  href="/stock-predictor" 
  className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
>
  Stock Predictor
</Link>



        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-sm">Loading...</span>
            </div>
          ) : session ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white text-sm font-medium">
                  {session.user?.email}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                href="/register" 
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                Register
              </Link>
              <Link 
                href="/login" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
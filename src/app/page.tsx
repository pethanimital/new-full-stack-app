export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MERN Full-Stack App</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            A modern, production-ready web application built with MongoDB, Next.js, React, and Node.js.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <a
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-50 transition-all duration-200 text-sm"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Authentication</h3>
            <p className="text-gray-600 text-xs">
              Secure login, registration, password reset, and Google OAuth.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Admin Dashboard</h3>
            <p className="text-gray-600 text-xs">
              Role-based access, user management, audit logs, and notifications.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Modern UI</h3>
            <p className="text-gray-600 text-xs">
              Beautiful, responsive design with Tailwind CSS and smooth user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
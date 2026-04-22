import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiLoader } from "react-icons/fi";

const ADMIN_EMAIL = "youradmin@gmail.com";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <FiLoader className="text-3xl animate-spin" />
          <p className="text-sm">Checking access...</p>
        </div>
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) return <Navigate to="/" replace />;

  // 🚫 Not admin
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 w-full max-w-sm text-center">
          
          {/* Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FiLock className="text-red-500 text-2xl" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Access Denied
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-500 mb-4">
            You don’t have permission to access this page.
          </p>

          {/* Back Button */}
          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Go Back Home
          </button>

        </div>
      </div>
    );
  }

  return children;
}
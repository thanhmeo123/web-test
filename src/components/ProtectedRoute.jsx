// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // ❌ Nếu chưa login → redirect về trang login
    return <Navigate to="/login" replace />;
  }

  // ✅ Nếu có login thì render component con
  return children;
}

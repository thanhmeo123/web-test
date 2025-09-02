import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth({ children }) {
  const { user } = useAuth(); // 👈 đổi currentUser -> user
  const location = useLocation();

  if (!user) {
    // ❌ chưa login thì redirect kèm state để sau login quay lại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Có user thì cho hiển thị
  return children;
}

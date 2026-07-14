import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  console.log("ProtectedRoute:", isLoggedIn);

  if (isLoggedIn === false) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
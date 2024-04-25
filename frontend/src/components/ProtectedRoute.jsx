// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

export const ProtectedRoute = ({ children }) => {
  // const user = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user);
  const token = Cookie.get("auth-token");

  if (!token) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

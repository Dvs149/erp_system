import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
    const token = localStorage.getItem("token");

    // ❌ not logged in → go to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // ✅ logged in → allow access
    return children;
};

export default ProtectedRoute;
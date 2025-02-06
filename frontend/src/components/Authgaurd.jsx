import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
export default AuthGuard;

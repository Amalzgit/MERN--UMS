import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) return <p>Loading...</p>;

    if (!user || user.role !== "admin") {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default AdminRoute;

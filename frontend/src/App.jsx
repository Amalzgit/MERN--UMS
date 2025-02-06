import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "./features/authSlice";
import { isAuthenticated } from "./utils/auth";
import { useDispatch } from "react-redux";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import { PrivateRoute } from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Nav from "./components/Nav";
import AuthGuard from "./components/Authgaurd";
const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated()) {
            dispatch(logout);
        }
    }, [dispatch]);
    return (
        <Router>
            <Nav />
            <Routes>
                <Route element={<AuthGuard />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

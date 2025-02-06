import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "../features/authSlice";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile()); 
    }
  }, [dispatch, token, user]);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl">Data Manager</h1>
      <div>
        {user && <Link to="/dashboard" className="mr-4">Dashboard</Link>}
        {user?.role === "admin" && <Link to="/admin" className="mr-4">Admin Panel</Link>}
        {user && <LogoutButton />} 
      </div>
    </nav>
  );
};

export default Navbar;

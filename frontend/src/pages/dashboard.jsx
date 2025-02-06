import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateProfileForm from "../components/UserEditForm";

const Dashboard = () => {
    const [user, setUser] = useState({});
    const [selectedfile, setSelectedfile] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await axios.get("http://localhost:5000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data || {});
            } catch (error) {
                console.error("Error fetching user data:", error?.response?.data || error.message);
                setUser({});
            }
        };

        fetchUserData();
    }, []);

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!selectedfile) {
            alert("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", selectedfile);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5000/api/user/upload-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUser((prevUser) => ({
                ...prevUser,
                profileImage: response.data.profileImage,
            }));

            alert("Profile image updated successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 w-full max-w-6xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 p-6">Dashboard</h1>

                {user ? (
                    <div className="flex flex-col md:flex-row gap-8 p-6">
                        <div className="md:w-1/2 text-center">
                            <p className="text-lg font-medium text-gray-700">
                                Welcome, <span className="text-blue-500">{user?.username || "User"}</span>
                            </p>
                            <p className="text-gray-600">{user?.email || "No email available"}</p>

                            {/* Profile Image Section */}
                            {user?.profileImage ? (
                                <img
                                    src={`http://localhost:5000${user.profileImage}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full mx-auto mt-4 border-4 border-gray-300 shadow-md"
                                />
                            ) : (
                                <p className="text-gray-500 italic mt-4">No Profile Image</p>
                            )}

                            {/* Image Upload Section */}
                            <form onSubmit={handleImageUpload} className="mt-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSelectedfile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full transition-all"
                                >
                                    Upload Image
                                </button>
                            </form>
                        </div>

                        <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Update Profile</h2>

                            <UpdateProfileForm user={user} setUser={setUser} />
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
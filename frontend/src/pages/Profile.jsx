import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/user",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                setUser(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (error) {
                setError("Failed to fetch profile");
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(
                "http://localhost:5000/api/user",
                { username, email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setUser(response.data);
            setError("");
        } catch (error) {
            setError("Failed to update profile");
        }
    };
    const handleDeleteProfile = async () => {
        try {
            const deleted = await axios.delete(
                "http://localhost:5000/api/user",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (deleted) {
                window.location.href = "/login";
                localStorage.removeItem("token");
            }
        } catch (error) {
            setError("Failed to delete account");
        }
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            {error && <p className="text-red-500">{error}</p>}
            {user ? (
                <div>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-blue-500 text-white py-2 rounded-md mt-4"
                    >
                        Update Profile
                    </button>
                    <button
                        onClick={handleDeleteProfile}
                        className="bg-red-500 text-white py-2 rounded-md mt-4"
                    >
                        Delete Account
                    </button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};
export default Profile;

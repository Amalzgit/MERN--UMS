import {
    getUserDetails,
    updateUserDetails,
    deleteUserAccount,
    uploadProfileImage
} from "../services/userServices.js";

export const getUser = async (req, res) => {
    try {
        const user = await getUserDetails(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required." });
        }
        const updatedUser = await updateUserDetails(req.user.id, {
            username,
            email,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        await deleteUserAccount(req.user.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const uploadPImage = async (req, res) => {
    try {
        const profileImage = await uploadProfileImage(req.user.id, req.file);
        res.json({ message: "Profile image updated", profileImage });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

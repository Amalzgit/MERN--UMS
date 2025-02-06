import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    findUserByMail,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    updateUserProfileImage
} from "../repositories/userRepository.js";

export const registerUser = async (username, email, password) => {
    const existingUser = await findUserByMail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
        username,
        email,
        password: hashedPassword,
    });
    return user;
};
export const loginUser = async (email, password) => {
    const user = await findUserByMail(email);
    if (!user) throw new Error("Invalid Credential");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    return { token: token, user: user };
};
export const getUserDetails = async (userId) => {
    const user = await getUserById(userId);
    if (!user) throw new Error("User not found");
    return user;
};

export const updateUserDetails = async (userId, updateData) => {
    const updatedUser = await updateUser(userId, updateData);
    if (!updateUser) {
        throw new Error("Failed to update user");
    }
    return updatedUser;
};
export const deleteUserAccount = async (userId) => {
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
        throw new Error("Failed to delete user");
    }
    return deletedUser;
};

export const uploadProfileImage = async (userId, file) => {
    if (!file) {
        throw new Error("No file uploaded");
    }

    const user = await getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const updatedUser = await updateUserProfileImage(userId, `/uploads/${file.filename}`);
    return updatedUser.profileImage;
};

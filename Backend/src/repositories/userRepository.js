import User from "../models/User.js";

export const findUserByMail = async (email) => {
    return await User.findOne({ email });
};
export const createUser = async (userData) => {
    return await User.create(userData);
};
export const getUserById = async (userId) => {
    return await User.findById(userId);
};
export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};
export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};
export const getAllUsers = async () => {
    return await User.find({}, "-password");
};
export const updateUserProfileImage = async (userId, imagePath) => {
    return await User.findByIdAndUpdate(userId, { profileImage: imagePath }, { new: true });
};

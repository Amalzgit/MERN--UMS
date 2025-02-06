import {
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser,
    createUser,
    findUserByMail
} from "../repositories/userRepository.js";

export const getAllUsersService = async () => {
    return await getAllUsers();
};
export const deleteUserService = async (id) => {
    const user = await getUserById(id);
    if (!user) throw new Error("User not found");

    await deleteUser(id);
    return { message: "User deleted successfully" };
};
export const updateUserRole = async (userId, role) => {
    if (!["admin", "user"].includes(role)) {
        throw new Error("Invalid role");
    }
    return await updateUser(userId, { role });
};

export const createNewUser = async (userData) =>{
    const existingUser = await findUserByMail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    return await createUser(userData);
}
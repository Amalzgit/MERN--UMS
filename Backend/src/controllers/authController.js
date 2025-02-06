import { registerUser,loginUser } from "../services/userServices.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginUser(email, password);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

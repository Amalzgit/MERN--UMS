import { getAllUsersService,deleteUserService,updateUserRole ,createNewUser} from "../services/adminService.js";
export const getUsers = async (req,res) =>{
    try {
        const users = await getAllUsersService()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch users" });

    }
}
export const userDelete = async (req, res) => {
    try {
      const response = await deleteUserService(req.params.id);
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message || "Failed to delete user" });
    }
  };
  export const userUpdateRole = async (req, res) => {
    try {
      const { role } = req.body;
      const user = await updateUserRole(req.params.id, role);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to update role" });
    }
  };
  export const createUser = async (req, res) => {
    try {
        const user = await createNewUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
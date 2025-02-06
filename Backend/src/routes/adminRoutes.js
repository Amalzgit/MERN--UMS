import express from "express";
import {getUsers,userDelete,userUpdateRole} from "../controllers/adminController.js";
import { authenticate,isAdmin } from "../middlewares/auth.js";

const router = express.Router()

router.get("/users",authenticate,isAdmin,getUsers)
router.delete("/users/:id",authenticate,isAdmin,userDelete)
router.put("/users/:id/role",authenticate,isAdmin,userUpdateRole)

export default router
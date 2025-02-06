import express from "express";
import {
    getUser,
    updateUser,
    deleteUser,
    uploadPImage
} from "../controllers/userController.js";
import {authenticate} from "../middlewares/auth.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/user", authenticate, getUser);
router.post("/user/upload-profile", authenticate, upload.single("profileImage"), uploadPImage);
router.put("/user", authenticate, updateUser);
router.delete("/user", authenticate, deleteUser);

export default router;

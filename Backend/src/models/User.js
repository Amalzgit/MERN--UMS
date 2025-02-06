import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    username:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked:{type:Boolean , default :false},
    profileImage: { type: String, default: "" }
},{timestamps:true});

export default mongoose.model("User",UserSchema)
import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["SUPER_ADMIN", "ADMIN"],
            default: "ADMIN",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Admin ||
    mongoose.model("Admin", adminSchema);

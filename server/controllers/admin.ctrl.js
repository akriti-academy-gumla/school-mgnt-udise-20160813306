import ENVs from "../conf/env.variables.js";
import AdminModel from "../models/admin.models.js";

const createAdmin = async function () {
    try {
        const isAdminAlreadyExists = await AdminModel.findOne();

        if (isAdminAlreadyExists) {
            console.log("Admin already exists.");
            return;
        }

        await AdminModel.create({
            username: ENVs.admin_username,
            password: ENVs.admin_password,
            role: "SUPER_ADMIN",
            isActive: true
        });

        console.log("Admin created successfully.");
    } catch (error) {
        console.error("Error creating admin:", error);
    }
};

export { createAdmin }
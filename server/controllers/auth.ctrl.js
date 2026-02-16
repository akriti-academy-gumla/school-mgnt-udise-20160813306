import ApiResponse from "../utils/api.response.message.js";
import adminModels from "../models/admin.models.js";
import ENVs from "../conf/env.variables.js";
import jwt from "jsonwebtoken"
import studentsModels from "../models/students.models.js";

export const studentLogin = async (req, res) => {
    try {
        console.log("Student Login Hit")
        console.log(req.body)
        const { mobileNo, password } = req.body;
        if (!mobileNo || !password) {
            return ApiResponse(res, 400, false, "Please fill all fields!!", true);
        }
        const student = await studentsModels
            .findOne({ "personalDetails.mobileNo": mobileNo })
            .select("+password");
        if (!student) {
            return ApiResponse(res, 401, false, "Mobile No or Password Failed!!", true);
        }
        const isMatch = password === student.password;
        if (!isMatch) {
            return ApiResponse(res, 401, false, "Mobile No or Password Failed!!", true);
        }
        const studentObj = student.toObject();
        delete studentObj.password;
        const token = jwt.sign(
            { id: student._id },
            ENVs.jwt_secret,
            { expiresIn: ENVs.jwt_expires }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return ApiResponse(
            res,
            200,
            true,
            `Welcome ${studentObj.personalDetails.studentFullName}!`,
            false,
            studentObj
        );
    } catch (error) {
        console.error("Error in studentLogin:", error);
        return ApiResponse(res, 500, false, "Internal Server Error!!", true);
    }
};

export const studentLogout = async (req, res) => {
    try {
        res.cookie("token", "");
        return ApiResponse(
            res,
            200,
            true,
            `You're are now logout.`,
            false
        );
    } catch (error) {
        console.error("Error in studentLogout:", error);
        return ApiResponse(res, 500, false, "Internal Server Error!!", true);
    }
}

export const adminLogin = async function (req, res) {
    try {
        console.log("Admin login called.");

        if (req.body) {

        } else {
            return ApiResponse(res, 400, false, "Please send user data", true)
        }

        const { username, password } = req.body;
        console.log(`Username: ${username} & Password: ${password}`)
        if (!username, !password) {
            return ApiResponse(res, 400, false, "Please fill all fields!!", true)
        }
        const adminUser = await adminModels.findOne({ username }).select("+password");
        console.log(adminUser)
        if (!adminUser) {
            return ApiResponse(res, 401, false, "Username or Password was incorrect!!", true);
        }
        const passwordMatching = adminUser.password === password;
        adminUser.password = null;
        if (!passwordMatching) {
            return ApiResponse(res, 401, false, "Username or Password was incorrect!!", true);
        }
        const token = jwt.sign(
            { id: adminUser._id, role: adminUser.role },
            ENVs.jwt_secret,
            { expiresIn: ENVs.jwt_expires }
        );
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: false,      // true only for HTTPS
            sameSite: "lax",
        });
        return ApiResponse(res, 200, true, "Admin LoggedIn Successfully.", false, adminUser);
    } catch (error) {
        console.log(error);
        return ApiResponse(res, 500, false, "Internal Server Error!!", true);
    }
}

export const adminLogout = async function (req, res) {
    try {
        res.cookie("token", "");
        return ApiResponse(
            res,
            200,
            true,
            `You're are now logout. (Aadmin)`,
            false
        );
    } catch (error) {
        console.error("Error in adminLogout:", error);
        return ApiResponse(res, 500, false, "Internal Server Error!!", true);
    }
}
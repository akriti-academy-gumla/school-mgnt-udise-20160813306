import ApiResponse from "../utils/api.response.message.js"
import studentsModels from "../models/students.models.js";

const newStudent = async (req, res) => {
    try {
        const {
            password,
            studentFullName,
            aadhaarNo,
            dob,
            gender,
            fathersName,
            fathersOccupation,
            mothersName,
            mothersOccupation,
            address,
            pincode,
            mobileNo,
            category,
            lastSchoolName,
            applicationForClass,
        } = req?.body;

        if (
            !password ||
            !studentFullName ||
            !aadhaarNo ||
            !dob ||
            !gender ||
            !fathersName ||
            !fathersOccupation ||
            !mothersName ||
            !mothersOccupation ||
            !address ||
            !mobileNo ||
            !category ||
            !applicationForClass
        ) {
            return ApiResponse(
                res,
                400,
                false,
                "All required fields must be filled!",
                true,
                null
            );
        }

        const existingStudent = await studentsModels.findOne({
            $or: [{ "personalDetails.aadhaarNo": aadhaarNo }, { "personalDetails.mobileNo": mobileNo }],
        });

        if (existingStudent) {
            return ApiResponse(
                res,
                409,
                false,
                "Student with this Aadhaar or Mobile Number already exists!",
                true,
                null
            );
        }

        const newStudent = await studentsModels.create({
            password,
            personalDetails: {
                studentFullName,
                aadhaarNo,
                dob,
                gender,
                fathersName,
                fathersOccupation,
                mothersName,
                mothersOccupation,
                address,
                pincode,
                mobileNo,
                category,
                lastSchoolName,
                applicationForClass,
            },
        });

        if (!newStudent) {
            return ApiResponse(
                res,
                400,
                false,
                "Failed to create student!",
                true,
                null
            );
        }

        newStudent.password = undefined;

        return ApiResponse(
            res,
            201,
            true,
            "New Student Added Successfully!",
            false,
            newStudent
        );
    } catch (error) {
        console.error("Error creating student:", error?.message);
        return ApiResponse(
            res,
            500,
            false,
            "Internal Server Error!!",
            true,
            null
        );
    }
};

const allStudent = async (req, res) => {
    try {
        const allStudents = await studentsModels.find();
        return ApiResponse(res, 200, true, "All students getting.", false, allStudents);
    } catch (error) {
        console.error("Error creating student:", error?.message);
        return ApiResponse(
            res,
            500,
            false,
            "Internal Server Error!!",
            true,
            null
        );
    }
};

const updateStudent = async (req, res) => {
    try {
        return ApiResponse(res, 501, true, "Student Update Not implemented!!", false, null)
    } catch (error) {
        console.error("Error updating student:", error?.message);
        return ApiResponse(
            res,
            500,
            false,
            "Internal Server Error!!",
            true,
            null
        );
    }
}

export { newStudent, allStudent, updateStudent };
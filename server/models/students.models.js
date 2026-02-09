import mongoose, { Schema } from "mongoose";

const personalDetailsSchema = new Schema({
    studentFullName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },

    aadhaarNo: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{12}$/
    },

    dob: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true,
    },

    fathersName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },

    fathersOccupation: {
        type: String,
        required: true,
        trim: true,
    },

    mothersName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },

    mothersOccupation: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    },

    pincode: {
        type: String,
        match: /^\d{6}$/,
        required: true
    },

    mobileNo: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },

    category: {
        type: String,
        enum: ["ST", "OBC", "GEN", "SC", "NA"],
        required: true
    },

    lastSchoolName: {
        type: String,
        trim: true,
    },

    applicationForClass: {
        type: String,
        enum: ["LKG", "UKG", "STD-1", "STD-2", "STD-3", "STD-4", "STD-5"],
        required: true
    }
});

const studentSchema = new Schema(
    {
        password: {
            type: String,
            required: true,
            select: false
        },

        dateOfAdmission: {
            type: Date,
            default: Date.now,
        },

        personalDetails: personalDetailsSchema
    },
    { timestamps: true }
);

export default mongoose.model("Student", studentSchema);

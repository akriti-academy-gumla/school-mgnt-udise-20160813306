import mongoose from "mongoose";

const connectToDB = async function (url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully.")
        return true;
    } catch (error) {
        console.log("MongoDB connection failed.")
        console.log(error?.message);
        return false;
    }
};

export default connectToDB;
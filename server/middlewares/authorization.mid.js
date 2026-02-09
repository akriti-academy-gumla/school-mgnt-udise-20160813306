import jwt from "jsonwebtoken";
import ENVs from "../conf/env.variables.js";
import ApiResponse from "../utils/api.response.message.js";

function adminAuthorizationMiddleware(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return ApiResponse(res, 401, false, "Please login first !!", true, null);
        }

        const decoded = jwt.verify(token, ENVs.jwt_secret);

        // Optional: check if role is admin
        if (decoded.role !== "SUPER_ADMIN") {
            return ApiResponse(res, 403, false, "Access denied !!", true, null);
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in admin authorization middleware:", error);
        return ApiResponse(res, 401, false, "Invalid or expired token !!", true, null);
    }
}

export default adminAuthorizationMiddleware;

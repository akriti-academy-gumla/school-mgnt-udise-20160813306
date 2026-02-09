import ENVs from "./conf/env.variables.js";
import express from "express";
import connectToDB from "./db/mongoDB.js";
import { createAdmin } from "./controllers/admin.ctrl.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminAuth.routes.js";
import studentAuthRoutes from "./routes/studentAuth.routes.js";
import cors from "cors";

// middleware
import adminAuthorizationMiddleware from "./middlewares/authorization.mid.js"
import studentRoutes from "./routes/student.routes.js";
// const deafultMongoURL = "mongodb://localhost:27017/";
console.clear()
const server = express();

server.use(express.json());
server.use(cookieParser())
server.use(cors({
    origin: "http://192.168.1.8:5500", // exact frontend origin
    credentials: true
}));
server.use("/api/v1/admin", adminRoutes);
server.use("/api/v1/", studentAuthRoutes);
server.use("/api/v1/student", adminAuthorizationMiddleware, studentRoutes);

server.listen(ENVs.app_port, async (error) => {
    if (!error) {
        console.log(`Server running at: "http://localhost:${ENVs.app_port}/"`)
        await connectToDB(`mongodb://${ENVs.db_host}:${ENVs.db_port}/${ENVs.db_name}`);
        await createAdmin();
    } else if (error) {
        console.log("Server running error!!")
        console.log(error)
    }
})
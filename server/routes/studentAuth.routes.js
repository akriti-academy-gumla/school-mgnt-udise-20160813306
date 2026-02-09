import express from "express";
import { studentLogin, studentLogout } from "../controllers/auth.ctrl.js";
const studentAuthRoutes = express.Router();
studentAuthRoutes.post("/login", studentLogin);
studentAuthRoutes.post("/logout", studentLogout);
export default studentAuthRoutes;
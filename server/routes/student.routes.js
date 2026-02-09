import express from "express";
import { newStudent, allStudent, updateStudent } from "../controllers/student.ctrl.js";

const studentRoutes = express.Router();

studentRoutes.post("/newStudent", newStudent);
studentRoutes.get("/allStudent", allStudent);
studentRoutes.post("/updateStudent/:adhaarNo", updateStudent);


export default studentRoutes;
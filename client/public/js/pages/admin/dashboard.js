import { AllStudents } from "../../api/student.api.js";
// fetch from localstorage
const adminDetails = JSON.parse(localStorage.getItem("adminDetails"));

const username = document.querySelector(".admin_username");
const adminID = document.querySelector(".admin_id");
const role = document.querySelector(".admin_role");

adminID.textContent = adminDetails._id;
role.textContent = adminDetails.role;
username.textContent = adminDetails.username;


const allStudentContainer = document.querySelector(".all-student-section");

const allStudentInfo = await AllStudents();

console.log(allStudentInfo)

// getting all students
import BASE_URL from "./http.js"

async function AllStudents() {
    return await fetch(`${BASE_URL}/student/allStudent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
    }).then((data) => data.json())
};


export { AllStudents }
import { AdminLogin } from "../../api/auth.api.js"

const form = document.querySelector(".admin-login-form");

form.addEventListener("submit", async function (events) {
    events.preventDefault();

    const usernameInput = document.querySelector("#username").value;
    const passwordInput = document.querySelector("#password").value;
    const errorDisplay = document.querySelector(".error-message");
    const toastContainer = document.querySelector(".toaster-container");
    const ackg = await AdminLogin({
        username: usernameInput, password: passwordInput
    });
    if (ackg.success) {
        toastContainer.style.display = "block";
        errorDisplay.textContent = ackg.message;
        console.log(ackg)
        localStorage.setItem("adminDetails", JSON.stringify(ackg.data));
        window.location.href = "/client/pages/admin/dashboard.html"
    }

    toastContainer.style.display = "block";
    errorDisplay.textContent = ackg.message;
    setTimeout(() => {
        toastContainer.style.display = "none";
    }, 3000);
})
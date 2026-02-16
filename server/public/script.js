console.log("Hello World!");
var body = document.querySelector("body");
const admin_login_form = document.querySelector("#admin-login-form");
admin_login_form.addEventListener("submit", async (events) => {
    events.preventDefault();

    let admin_username = document.querySelector("#username");
    let admin_password = document.querySelector("#password");

    if (admin_username.value === "" || admin_password.value === "") {
        let errorDisplay = document.querySelector("#admin-login-error");
        errorDisplay.textContent = "Please fill both inputs.";
        admin_password.addEventListener("focus", (events) => { errorDisplay.textContent = "" });
        admin_username.addEventListener("focus", (events) => { errorDisplay.textContent = "" });
        return false;
    }

    const userData = { username: admin_username.value, password: admin_password.value };
    const response = await fetch("/api/v1/admin/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }).then((data) => data.json());

})
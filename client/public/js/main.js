const adminLoginBtn = document.querySelector(".adminLoginBtn");
const studentLoginBtn = document.querySelector(".studentLoginBtn");
const currentView = document.querySelector("main");

adminLoginBtn.addEventListener("click", function () {
    window.location.href = "/client/pages/admin/login.html"
})

studentLoginBtn.addEventListener("click", function () {
    window.location.href = "/client/pages/auth/login.html"
})
import BASE_URL from "./http.js";
async function AdminLogin({ username, password }) {
    return await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then((data) => data.json())
};
export { AdminLogin }
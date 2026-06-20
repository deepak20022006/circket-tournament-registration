const BASE_URL = "https://8080-eecfbdcfbafbbbaeaadcaefefdfabeedeaffcafb.premiumproject.examly.io";

// REGISTER
export async function registerUser(userData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
}

// LOGIN
export async function loginUser(credentials) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
}
export async function addPlayer(playerData) {
    const res = await fetch(`${BASE_URL}/addPlayer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData),
    });
    if (!res.ok) throw new Error("Failed to add player");
    return res.text();
}

export async function getAllPlayers() {
    const res = await fetch(`${BASE_URL}/getAllPlayer`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) throw new Error("Failed to fetch players");
    return res.json();
}
export async function updatePlayer(id, playerData) {
    const res = await fetch(`${BASE_URL}/updatePlayer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerData),
    });
    if (!res.ok) throw new Error("Failed to update player");
    return res.text();
}

export async function deletePlayer(id) {
    const res = await fetch(`${BASE_URL}/deletePlayer/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete player");
    return res.text();
}

const BASE_URL = "https://8080-eecfbdcfbafbbbaeaadcaefefdfabeedeaffcafb.premiumproject.examly.io";

// Create Team
export async function createTeam(teamData) {
    const res = await fetch(`${BASE_URL}/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
    });
    if (!res.ok) throw new Error("Failed to create team");
    return res.json();
}

// Get All Teams
export async function getAllTeams() {
    const res = await fetch(`${BASE_URL}/teams`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch teams");
    return res.json();
}

// Update Team
export async function updateTeam(id, teamData) {
    const res = await fetch(`${BASE_URL}/teams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
    });
    if (!res.ok) throw new Error("Failed to update team");
    return res.json();
}

// Delete Team
export async function deleteTeam(id) {
    const res = await fetch(`${BASE_URL}/teams/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete team");
    return res.text();
}

// Create Match
export async function createMatch(matchData) {
    const res = await fetch(`${BASE_URL}/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchData),
    });
    if (!res.ok) throw new Error("Failed to create match");
    return res.json();
}

// Get All Matches
export async function getAllMatches() {
    const res = await fetch(`${BASE_URL}/matches`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch matches");
    return res.json();
}

// Get Match by ID
export async function getMatchById(id) {
    const res = await fetch(`${BASE_URL}/matches/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch match");
    return res.json();
}

// Update Match
export async function updateMatch(id, matchData) {
    const res = await fetch(`${BASE_URL}/matches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchData),
    });
    if (!res.ok) throw new Error("Failed to update match");
    return res.json();
}

// Delete Match
export async function deleteMatch(id) {
    const res = await fetch(`${BASE_URL}/matches/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete match");
    return res.text();
}

// Get Matches by Status
export async function getMatchesByStatus(status) {
    const res = await fetch(`${BASE_URL}/matches/status/${status}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch matches by status");
    return res.json();
}

// ========== Subscriptions ==========
export async function getSubscriptions(fanId = 1) {
    const res = await fetch(`${BASE_URL}/subscriptions/user/${fanId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch subscriptions");
    return res.json();
}

export async function subscribeToTeam(teamId, fanId = 1) {
    const body = { userId: fanId, teamId };
    const res = await fetch(`${BASE_URL}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to subscribe");
    return res.json();
}

export async function unsubscribeFromTeam(subscriptionId) {
    const res = await fetch(`${BASE_URL}/subscriptions/${subscriptionId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to unsubscribe");
    return res.text();
}

// ========== Notifications ==========
export async function getNotifications(fanId = 1) {
    const res = await fetch(`${BASE_URL}/notifications/fan/${fanId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json();
}

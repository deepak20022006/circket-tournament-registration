import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    CircularProgress,
    Alert,
} from "@mui/material";
import { getAllTeams, createMatch } from "../utils";

const statuses = ["SCHEDULED", "LIVE", "COMPLETED"];

export default function CreateMatch() {
    const [teams, setTeams] = useState([]);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [form, setForm] = useState({
        matchName: "",
        startDate: "",
        endDate: "",
        team1Id: "",
        team2Id: "",
        status: "SCHEDULED",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function fetchTeams() {
            try {
                setLoadingTeams(true);
                const data = await getAllTeams();
                setTeams(data);
            } catch {
                setError("Failed to load teams");
            } finally {
                setLoadingTeams(false);
            }
        }
        fetchTeams();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (form.team1Id === form.team2Id) {
            setError("Select different teams for Team 1 and Team 2");
            return;
        }
        if (!form.matchName || !form.startDate || !form.endDate || !form.team1Id || !form.team2Id) {
            setError("Please fill all fields");
            return;
        }
        try {
            await createMatch(form);
            setSuccess("Match created successfully!");
            setForm({
                matchName: "",
                startDate: "",
                endDate: "",
                team1Id: "",
                team2Id: "",
                status: "SCHEDULED",
            });
        } catch {
            setError("Failed to create match");
        }
    };

    if (loadingTeams) return <CircularProgress />;

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, bgcolor: "#fff", borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Create New Match
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Match Name"
                    name="matchName"
                    fullWidth
                    margin="normal"
                    value={form.matchName}
                    onChange={handleChange}
                />

                <TextField
                    label="Start Date & Time"
                    name="startDate"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={form.startDate}
                    onChange={handleChange}
                />

                <TextField
                    label="End Date & Time"
                    name="endDate"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={form.endDate}
                    onChange={handleChange}
                />

                <TextField
                    select
                    label="Team 1"
                    name="team1Id"
                    fullWidth
                    margin="normal"
                    value={form.team1Id}
                    onChange={handleChange}
                >
                    {teams.map((team) => (
                        <MenuItem key={team.team_id} value={team.team_id}>
                            {team.teamName} ({team.city || "-"})
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Team 2"
                    name="team2Id"
                    fullWidth
                    margin="normal"
                    value={form.team2Id}
                    onChange={handleChange}
                >
                    {teams.map((team) => (
                        <MenuItem key={team.team_id} value={team.team_id}>
                            {team.teamName} ({team.city || "-"})
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Status"
                    name="status"
                    fullWidth
                    margin="normal"
                    value={form.status}
                    onChange={handleChange}
                >
                    {statuses.map((s) => (
                        <MenuItem key={s} value={s}>
                            {s}
                        </MenuItem>
                    ))}
                </TextField>

                <Button variant="contained" type="submit" sx={{ mt: 3 }}>
                    Create Match
                </Button>
            </form>
        </Box>
    );
}

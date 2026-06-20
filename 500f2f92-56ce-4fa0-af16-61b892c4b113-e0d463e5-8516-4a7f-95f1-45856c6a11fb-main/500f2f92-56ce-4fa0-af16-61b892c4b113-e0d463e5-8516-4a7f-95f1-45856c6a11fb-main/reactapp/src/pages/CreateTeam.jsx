import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { createTeam } from "../utils";

export default function CreateTeam() {
    const [teamName, setTeamName] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await createTeam({ teamName, city }); 
            setMessage("Team created successfully!");
            setTimeout(()=>navigate("/teams"),800);
            setTeamName("");
            setCity("");
        } catch (error) {
            setMessage("Failed to create team.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f4f6f8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2
            }}
        >
            <Paper sx={{ p: 4, maxWidth: 400, width: "100%" }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    Create New Team
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Team Name"
                        variant="outlined"
                        fullWidth
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />
                    <TextField
                        label="City"
                        variant="outlined"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Team"}
                    </Button>
                </form>

                {message && (
                    <Typography sx={{ mt: 2, color: message.includes("✅") ? "green" : "red" }}>
                        {message}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}

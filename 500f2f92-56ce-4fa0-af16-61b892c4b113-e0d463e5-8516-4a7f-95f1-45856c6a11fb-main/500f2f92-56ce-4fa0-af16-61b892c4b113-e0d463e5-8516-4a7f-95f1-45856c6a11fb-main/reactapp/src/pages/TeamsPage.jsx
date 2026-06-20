import React, { useState } from "react";
import { Box, Paper, Tabs, Tab } from "@mui/material";
import CreateTeam from "./CreateTeam";
import ManageTeams from "./ManageTeams";

export default function TeamsPage() {
    const [tab, setTab] = useState(0);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/036/426/833/small_2x/cricket-kits-helmet-cricket-balls-and-bat-on-grass-field-concept-sport-equipment-well-known-competitive-sport-cricket-is-a-bat-and-ball-game-played-between-two-teams-of-eleven-players-on-a-field-photo.JPG")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Paper sx={{ width: "100%", maxWidth: 900, p: 2,backgroundColor: "rgba(255,255,255,0.9)" }}>
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    centered
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Create Team" />
                    <Tab label="Manage Teams" />
                </Tabs>

                {tab === 0 && <CreateTeam />}
                {tab === 1 && <ManageTeams />}
            </Paper>
        </Box>
    );
}

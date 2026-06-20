import React, { useState } from "react";
import { Box, Paper, Tabs, Tab } from "@mui/material";
import CreateMatch from "./CreateMatch";
import ManageMatchesList from "./ManageMatchesList";

export default function MatchesPage() {
    const [tab, setTab] = useState(0);

    return (
        // <Box
        //     sx={{
        //         minHeight: "100vh",
        //         backgroundColor: "#f4f6f8",
        //         p: 2,
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "flex-start",
        //     }}
        // >
        //     <Paper sx={{ width: "100%", maxWidth: 900, p: 2 }}>

        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url("https://media.istockphoto.com/id/1255328634/photo/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch.jpg?s=612x612&w=0&k=20&c=e2yHkZt3DISv6e1dpkZgABgC9fxfY93cB1H4MdY9sJs=")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    p: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.85)", // translucent background so text is visible
                    boxShadow: 3,
                }}
            >
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    centered
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Create Match" />
                    <Tab label="Manage Matches" />
                </Tabs>

                {tab === 0 && <CreateMatch />}
                {tab === 1 && <ManageMatchesList />}
            </Paper>
        </Box>
    );
}

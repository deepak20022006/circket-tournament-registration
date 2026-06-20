import React from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const dashboards = [
        {
            title: "Fan Dashboard",
            description: "Manage team subscriptions, notifications, and fan activities.",
            icon: <PeopleIcon style={{ fontSize: 50, color: "#1976d2" }} />,
            path: "/fan-dashboard",
        },
        {
            title: "Player Dashboard",
            description: "View player profiles, stats, and match details.",
            icon: <SportsSoccerIcon style={{ fontSize: 50, color: "#1976d2" }} />,
            path: "/home",
        },
        {
            title: "Organizer Dashboard",
            description: "Schedule matches, manage tournaments and teams.",
            icon: <EmojiEventsIcon style={{ fontSize: 50, color: "#1976d2" }} />,
            path: "/organiser-dashboard",
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Navbar always at top */}
            {/* <AdminNavbar /> */}

            <Box sx={{ p: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: "bold", color: "navy" }}
                >
                    Admin Dashboard
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {dashboards.map((dashboard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    textAlign: "center",
                                    p: 3,
                                    borderRadius: "16px",
                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
                                    },
                                }}
                            >
                                <CardContent>
                                    {dashboard.icon}
                                    <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                                        {dashboard.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ my: 2, color: "gray" }}>
                                        {dashboard.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            navigate(dashboard.path, { state: { isAdmin: true } })
                                        }
                                        sx={{ borderRadius: "12px" }}
                                    >
                                        Go to {dashboard.title}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

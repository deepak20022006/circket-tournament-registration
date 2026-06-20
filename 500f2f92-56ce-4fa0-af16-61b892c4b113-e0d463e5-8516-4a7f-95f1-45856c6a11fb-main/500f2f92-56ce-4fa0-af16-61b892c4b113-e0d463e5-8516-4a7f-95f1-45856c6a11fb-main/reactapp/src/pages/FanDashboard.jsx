import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Tabs,
    Tab,
    Typography,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

import Alert from "@mui/material/Alert";
import {
    getAllTeams,
    subscribeToTeam,
    unsubscribeFromTeam,
    getSubscriptions,
    getNotifications,
} from "../utils";

import AdminNavbar from "../components/AdminNavbar";
import { useLocation } from "react-router-dom";


const user = JSON.parse(localStorage.getItem("user"));
const FAN_ID = user?.id;

export default function FanDashboard() {
    const [tab, setTab] = useState(0);
    const [teams, setTeams] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [loadingSubs, setLoadingSubs] = useState(true);
    const [loadingNotifs, setLoadingNotifs] = useState(true);

    // Fetch all teams
    useEffect(() => {
        async function fetchTeams() {
            try {
                setLoadingTeams(true);
                const data = await getAllTeams();
                setTeams(data);
            } catch {
                console.error("Failed to load teams");
            } finally {
                setLoadingTeams(false);
            }
        }
        fetchTeams();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            setLoadingSubs(true);
            const subs = await getSubscriptions(FAN_ID);

            // Merge team details
            const subsWithTeam = subs.map(sub => {
                const team = teams.find(t => t.team_id === sub.teamId);
                return { ...sub, teamName: team?.teamName || "-", city: team?.city || "-" };
            });

            setSubscriptions(subsWithTeam);
        } catch {
            console.error("Failed to load subscriptions");
        } finally {
            setLoadingSubs(false);
        }
    };
    useEffect(() => {
        fetchSubscriptions();
    }, []);

    // Fetch notifications
    useEffect(() => {
        async function fetchNotifs() {
            try {
                setLoadingNotifs(true);
                const data = await getNotifications(FAN_ID);
                setNotifications(data);
            } catch {
                console.error("Failed to load notifications");
            } finally {
                setLoadingNotifs(false);
            }
        }
        fetchNotifs();
    }, []);

    // Subscribe / Unsubscribe toggle
    const handleToggleSubscription = async (teamId) => {
        try {
            const existingSub = subscriptions.find((s) => s.teamId === teamId);
            if (existingSub) {
                await unsubscribeFromTeam(existingSub.subscriptionId);
            } else {
                await subscribeToTeam(teamId, FAN_ID);
            }
            fetchSubscriptions();
        } catch {
            alert("Failed to update subscription");
        }
    };

    const location = useLocation();
    const isAdmin = location.state?.isAdmin || false;

    return (

        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage:
                    "url('https://media.istockphoto.com/id/1141350038/photo/blurred-photo-of-fans-cheering-during-cricket-match.jpg?s=612x612&w=0&k=20&c=WXqpfOZDwMLr-mCw6LO2H_2sKdd8pFL5Yn81I5mEYhk=')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            {/* {isAdmin && <AdminNavbar />} */}
            <Paper sx={{
                width: "100%", maxWidth: 900, p: 2, backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 2,
                boxShadow: 3,
            }}>
                {/* {isAdmin && (
                    <Alert severity="info" sx={{ mb: 2, fontWeight: "bold" }}>
                        ADMIN MODE ENABLED
                    </Alert>
                )} */}
                {/* FAN DASHBOARD Heading */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 3,
                        fontFamily: "'Roboto', sans-serif",
                        background: "linear-gradient(90deg, #001f3f, #003366)", // navy blue gradient
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        position: "relative",
                        "&::after": {
                            content: '""',
                            display: "block",
                            height: "4px",
                            width: "100%",
                            background: "rgba(0, 31, 63, 0.3)", // subtle navy reflection
                            borderRadius: "2px",
                            margin: "4px auto 0",
                            transform: "scaleY(-1)",
                            opacity: 0.6,
                        },
                    }}
                >
                    FAN DASHBOARD
                </Typography>



                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    centered
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Subscribe to Teams" />
                    <Tab label="My Subscriptions" />
                    <Tab label="Inbox" />
                </Tabs>

                {/* Subscribe to Teams */}
                {tab === 0 && (
                    <>
                        {loadingTeams ? (
                            <CircularProgress />
                        ) : (
                            teams.map((team) => {
                                const isSubscribed = subscriptions.some((s) => s.teamId === team.team_id);
                                return (
                                    <Box
                                        key={team.team_id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography>
                                            {team.teamName} ({team.city || "-"})
                                        </Typography>
                                        <Button
                                            variant={isSubscribed ? "outlined" : "contained"}
                                            color={isSubscribed ? "error" : "primary"}
                                            size="small"
                                            onClick={() => handleToggleSubscription(team.team_id)}
                                        >
                                            {isSubscribed ? "Unsubscribe" : "Subscribe"}
                                        </Button>
                                    </Box>
                                );
                            })
                        )}
                    </>
                )}

                {/* My Subscriptions */}
                {tab === 1 && (
                    <>
                        {loadingSubs ? (
                            <CircularProgress />
                        ) : subscriptions.length === 0 ? (
                            <Typography>You have not subscribed to any teams yet.</Typography>
                        ) : (
                            subscriptions.map((sub) => (
                                <Box
                                    key={sub.teamId}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 1,
                                    }}
                                >
                                    <Typography>
                                        {sub.teamName} ({sub.city || "-"})
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleToggleSubscription(sub.teamId)}
                                    >
                                        Unsubscribe
                                    </Button>
                                </Box>
                            ))
                        )}
                    </>
                )}

                {/* Inbox */}
                {tab === 2 && (
                    <>
                        {loadingNotifs ? (
                            <CircularProgress />
                        ) : notifications.length === 0 ? (
                            <Typography>No notifications yet.</Typography>
                        ) : (
                            <List>
                                {notifications.map((n) => (
                                    <React.Fragment key={n.notificationId}>
                                        <ListItem>
                                            <ListItemText
                                                primary={n.message}
                                                secondary={new Date(n.createdAt).toLocaleString()}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
}
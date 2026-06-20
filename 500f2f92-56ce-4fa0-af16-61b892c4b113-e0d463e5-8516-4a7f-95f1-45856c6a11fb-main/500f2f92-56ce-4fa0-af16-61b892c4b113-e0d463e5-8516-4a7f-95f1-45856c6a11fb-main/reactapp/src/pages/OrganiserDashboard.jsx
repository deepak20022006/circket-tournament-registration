// import React from "react";
// import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material";
// import SportsCricketIcon from "@mui/icons-material/SportsCricket";
// import EventIcon from "@mui/icons-material/Event";
// import EditIcon from "@mui/icons-material/Edit";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import StopIcon from "@mui/icons-material/Stop";

// import AdminNavbar from "../components/AdminNavbar";
// import { useLocation } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// export default function OrganiserDashboard() {
//     const actions = [
//         {
//             title: "Teams",
//             description: "Create and manage all registered teams.",
//             icon: <SportsCricketIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
//             link: "/teams",
//         },
//         {
//             title: "Manage Matches",
//             description: "Create, update, start, and end matches all in one place.",
//             icon: <EventIcon sx={{ fontSize: 40, color: "#388e3c" }} />,
//             link: "/manage-matches", // changed to one page
//         },
//     ];

//     const location = useLocation();
//     const isAdmin = location.state?.isAdmin || false;

//     return (
//         // <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 backgroundImage:
//                     'url("https://www.shutterstock.com/image-illustration/bottom-view-cricket-open-air-600nw-2433178109.jpg")',
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//                 p: 4,
//             }}
//         >
//             {/* {isAdmin && <AdminNavbar />}
//             {isAdmin && (
//                 <Alert severity="info" sx={{ mb: 2, fontWeight: "bold" }}>
//                     ADMIN MODE ENABLED
//                 </Alert>
//             )} */}
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "black" }}>
//                 Organiser Dashboard
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 4, color: "black" }}>
//                 Manage your cricket tournament — from creating teams to finalizing results.
//             </Typography>

//             <Grid container spacing={3}>
//                 {actions.map((action, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                         <Card
//                             sx={{
//                                 borderRadius: 3,
//                                 boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                                 transition: "transform 0.2s",
//                                 "&:hover": { transform: "scale(1.03)" },
//                             }}
//                         >
//                             <CardContent sx={{ textAlign: "center" }}>
//                                 {action.icon}
//                                 <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
//                                     {action.title}
//                                 </Typography>
//                                 <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
//                                     {action.description}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions sx={{ justifyContent: "center", pb: 2 }}>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     href={action.link}
//                                     sx={{ borderRadius: 20, px: 3 }}
//                                 >
//                                     Go
//                                 </Button>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }

import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import EventIcon from "@mui/icons-material/Event";
import { useLocation } from "react-router-dom";

export default function OrganiserDashboard() {
    const actions = [
        {
            title: "Teams",
            description: "Create and manage all registered teams.",
            icon: <SportsCricketIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
            link: "/teams",
        },
        {
            title: "Manage Matches",
            description:
                "Create, update, start, and end matches all in one place.",
            icon: <EventIcon sx={{ fontSize: 40, color: "#388e3c" }} />,
            link: "/manage-matches",
        },
    ];

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                p: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Background image */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage:
                        'url("https://www.shutterstock.com/image-illustration/bottom-view-cricket-open-air-600nw-2433178109.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 0,
                }}
            />

            {/* Translucent overlay */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255,255,255,0.3)", // <-- adjust opacity here
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 2,textAlign:"center" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "black" }}
                >
                    Organiser Dashboard
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "black" }}>
                    Manage your cricket tournament — from creating teams to
                    finalizing results.
                </Typography>

                <Grid container spacing={3} sx = {{justifyContent:"center",alignItems:"center"}}>
                    {actions.map((action, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    transition: "transform 0.2s",
                                    "&:hover": { transform: "scale(1.03)" },
                                }}
                            >
                                <CardContent sx={{ textAlign: "center" }}>
                                    {action.icon}
                                    <Typography
                                        variant="h6"
                                        sx={{ mt: 2, fontWeight: "bold" }}
                                    >
                                        {action.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#666", mt: 1 }}
                                    >
                                        {action.description}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ justifyContent: "center", pb: 2 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={action.link}
                                        sx={{ borderRadius: 20, px: 3 }}
                                    >
                                        Go
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
    return (
        <AppBar position="static" sx={{ background: "navy" }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/admin">
                    Admin Home
                </Button>
                <Button color="inherit" component={Link} to="/fan-dashboard" state={{ isAdmin: true }}>
                    Fan Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/player-dashboard" state={{ isAdmin: true }}>
                    Player Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/organiser-dashboard" state={{ isAdmin: true }}>
                    Organiser Dashboard
                </Button>
            </Toolbar>
        </AppBar>
    );
}

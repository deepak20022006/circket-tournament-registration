// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './NavBar.css';

// export default function NavBar() {
//     const navigate = useNavigate();

//     return (
//         <header className="nav-header">
//             <div className="nav-inner">
//                 {/* Back button */}
//                 <button
//                     onClick={() => navigate(-1)}
//                     style={{
//                         background: 'transparent',
//                         border: 'none',
//                         color: 'white',
//                         fontSize: '18px',
//                         cursor: 'pointer',
//                         marginRight: '16px'
//                     }}
//                     aria-label="Go back"
//                     title="Go back"
//                 >
//                     &#8592;
//                 </button>

//                 <h1 className="nav-title">Neo Cricket Tournament Registration</h1>
//                 <nav className="nav-links">
//                     <Link className="nav-link" to="/view-players">Players</Link>
//                     <Link className="nav-link" to="/home">Home</Link>
//                     <Link className="nav-link register-link" to="/add-player">Register Player</Link>
//                     <Link className="nav-link logout" to="/login">Logout</Link>
//                 </nav>
//             </div>
//         </header>
//     );
// }

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: "navy" }}>
            <Toolbar>
                {/* Back button */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="go back"
                    onClick={() => navigate(-1)}
                    sx={{ mr: 2 }}
                >
                    <ArrowBackIcon />
                </IconButton>

                {/* Title */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                >
                    Neo Cricket Tournament Registration
                </Typography>

                {/* Links */}
                <Button color="inherit" component={Link} to="/view-players" sx={{ fontWeight: "bold" }}>
                    Players
                </Button>
                <Button color="inherit" component={Link} to="/home" sx={{ fontWeight: "bold" }}>
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/add-player"
                    sx={{ fontWeight: "bold" }}
                >
                    Register Player
                </Button>
                <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: "bold" }}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

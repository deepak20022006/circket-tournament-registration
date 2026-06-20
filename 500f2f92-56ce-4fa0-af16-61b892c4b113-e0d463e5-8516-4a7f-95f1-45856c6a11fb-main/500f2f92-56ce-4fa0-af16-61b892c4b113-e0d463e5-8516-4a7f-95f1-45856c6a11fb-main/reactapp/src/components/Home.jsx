import React, { useEffect } from 'react';
import './Home.css';
import background from '../assets/background.jpg';

import Alert from "@mui/material/Alert";
export default function Home() {
    useEffect(() => {
        const navbar = document.querySelector('nav'); // adjust selector to match your NavBar
        const footer = document.querySelector('footer'); // adjust selector to match your Footer
        if (navbar && footer) {
            document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
            document.documentElement.style.setProperty('--footer-height', `${footer.offsetHeight}px`);
        }
    }, []);

    return (
        <div className="home-hero" role="banner">
            
            <div className="home-image-wrapper">
                <img src={background} alt="cricket" className="home-image" />
                <div className="home-overlay">
                    <h2>Welcome to Cricket Tournament Registration</h2>
                    <a className="cta-button" href="/add-player">Register Player</a>
                </div>
            </div>
        </div>
    );
}

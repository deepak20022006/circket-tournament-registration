// import React, { useState } from 'react';
// import { loginUser } from '../api.js'; // Adjust the import path as necessary
// import { useNavigate, Link } from 'react-router-dom';

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const data = await loginUser({ email, password });

//             if (data.status === "success") {
//                 alert("Login successful");

//                     localStorage.setItem("user", JSON.stringify(data));
//                 // Redirect based on role
//                 switch (data.role) {
//                     case "PLAYER":
//                         navigate("/home");
//                         break;
//                     case "ORGANISER":
//                         navigate("/organiser-dashboard");
//                         break;
//                     case "FAN":
//                         navigate("/fan-dashboard");
//                         break;
//                     case "ADMIN":
//                         navigate("/admin-dashboard");
//                         break;
//                     default:
//                         navigate("/home"); // fallback
//                 }
//             } else {
//                 alert(data.message || "Invalid credentials");
//             }
//         } catch (err) {
//             alert(err.message || "Login failed");
//         }
//     };


//     return (
//         <div
//             style={{
//                 maxWidth: "400px",
//                 margin: "40px auto",
//                 padding: "24px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 background: "#fafafa",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
//             }}
//         >
//             <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
//                     <label htmlFor="email" style={{ minWidth: "90px", marginRight: "8px" }}>Email</label>
//                     <input
//                         id="email"
//                         type='email'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: "24px", display: "flex", alignItems: "center" }}>
//                     <label htmlFor="password" style={{ minWidth: "90px", marginRight: "8px" }}>Password</label>
//                     <input
//                         id="password"
//                         type='password'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                     />
//                 </div>
//                 <button
//                     type='submit'
//                     style={{
//                         width: "100%",
//                         padding: "10px",
//                         borderRadius: "4px",
//                         border: "none",
//                         background: "#1976d2",
//                         color: "#fff",
//                         fontWeight: "bold",
//                         fontSize: "16px",
//                         cursor: "pointer"
//                     }}
//                 >
//                     Login
//                 </button>
//             </form>
//             <p style={{ marginTop: "16px", textAlign: "center" }}>
//                 Don't have an account? <Link to='/register'>Register here</Link>
//             </p>
//         </div>
//     );
// }
// export default Login;

import React, { useState } from "react";
import { loginUser } from "../api.js"; // Adjust the import path as necessary
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email, password });

            if (data.status === "success") {
                alert("Login successful");
                localStorage.setItem("user", JSON.stringify(data));

                switch (data.role) {
                    case "PLAYER":
                        navigate("/home");
                        break;
                    case "ORGANISER":
                        navigate("/organiser-dashboard");
                        break;
                    case "FAN":
                        navigate("/fan-dashboard");
                        break;
                    case "ADMIN":
                        navigate("/admin-dashboard");
                        break;
                    default:
                        navigate("/home");
                }
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (err) {
            alert(err.message || "Login failed");
        }
    };

    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage:
                    'url("https://t4.ftcdn.net/jpg/12/98/44/43/360_F_1298444345_HUyusJjkNVRBLpd3eiacIO1AR1QFoNaT.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* translucent overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.4)", // adjust opacity
                    zIndex: 0,
                }}
            />

            {/* login box */}
            <div
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    margin: "40px auto",
                    padding: "24px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    zIndex: 1,
                    position: "relative",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            marginBottom: "16px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <label
                            htmlFor="email"
                            style={{ minWidth: "90px", marginRight: "8px" }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                flex: 1,
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "24px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <label
                            htmlFor="password"
                            style={{ minWidth: "90px", marginRight: "8px" }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                flex: 1,
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "none",
                            background: "#1976d2",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Login
                    </button>
                </form>
                <p style={{ marginTop: "16px", textAlign: "center" }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
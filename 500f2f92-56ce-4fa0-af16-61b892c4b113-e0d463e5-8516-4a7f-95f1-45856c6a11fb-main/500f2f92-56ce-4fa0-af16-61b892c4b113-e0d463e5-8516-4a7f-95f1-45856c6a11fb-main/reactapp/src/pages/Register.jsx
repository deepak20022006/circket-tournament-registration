// import React, { useState } from "react";
// import { registerUser } from "../api.js"; // Adjust the import path as necessary
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//     const [form, setForm] = useState({ name: "", email: "", password: "", role: "FAN" });
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const validate = () => {
//         const newErrors = {};

//         // Name: only letters and spaces, at least 2 chars
//         if (!/^[A-Za-z\s]{2,}$/.test(form.name)) {
//             newErrors.name = "Name must contain only letters and spaces (min 2 characters).";
//         }

//         // Email: basic pattern (browser also checks because type="email")
//         if (!form.email) {
//             newErrors.email = "Email is required.";
//         }

//         // Password: at least 6 characters
//         if (form.password.length < 6) {
//             newErrors.password = "Password must be at least 6 characters long.";
//         }

//         return newErrors;
//     };

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         setErrors(validationErrors);
//         if (Object.keys(validationErrors).length > 0) {
//             return; // don't submit if validation fails
//         }
//         try {
//             await registerUser(form);
//             alert("Registration successful");
//             navigate("/login"); // Redirect to login page after successful registration
//         } catch (err) {
//             alert("Registration failed");
//         }
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
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
//             <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Register</h2>
//             <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
//                 <label htmlFor="name" style={{ marginBottom: "4px" }}>Name</label>
//                 <input
//                     id="name"
//                     name="name"
//                     placeholder="Name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                 />
//                 {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
//             </div>
//             <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
//                 <label htmlFor="email" style={{ marginBottom: "4px" }}>Email</label>
//                 <input
//                     id="email"
//                     name="email"
//                     placeholder="Email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                     style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                 />
//                 {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
//             </div>
//             <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
//                 <label htmlFor="password" style={{ marginBottom: "4px" }}>Password</label>
//                 <input
//                     id="password"
//                     name="password"
//                     placeholder="Password"
//                     type="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                     style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                 />
//                 {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
//             </div>
//             <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column" }}>
//                 <label htmlFor="role" style={{ marginBottom: "4px" }}>Role</label>
//                 <select
//                     id="role"
//                     name="role"
//                     value={form.role}
//                     onChange={handleChange}
//                     style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
//                 >
//                     {/* <option value="ADMIN">Admin</option> */}
//                     <option value="ORGANISER">Organiser</option>
//                     <option value="FAN">Fan</option>
//                     <option value="PLAYER">Player</option>
//                 </select>
//             </div>
//             <button
//                 type="submit"
//                 style={{
//                     width: "100%",
//                     padding: "10px",
//                     borderRadius: "4px",
//                     border: "none",
//                     background: "#1976d2",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     fontSize: "16px",
//                     cursor: "pointer"
//                 }}
//             >
//                 Register
//             </button>
//         </form>
//     );
// }
import React, { useState } from "react";
import { registerUser } from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "FAN" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!/^[A-Za-z\s]{2,}$/.test(form.name)) {
            newErrors.name = "Name must contain only letters and spaces (min 2 characters).";
        }
        if (!form.email) {
            newErrors.email = "Email is required.";
        }
        if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            await registerUser(form);
            alert("Registration successful");
            navigate("/login");
        } catch (err) {
            alert("Registration failed");
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
                    backgroundColor: "rgba(255,255,255,0.4)", // tweak opacity
                    zIndex: 0,
                }}
            />

            {/* form box */}
            <form
                onSubmit={handleSubmit}
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
                <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Register</h2>

                <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
                    <label htmlFor="name" style={{ marginBottom: "4px" }}>Name</label>
                    <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
                    <label htmlFor="email" style={{ marginBottom: "4px" }}>Email</label>
                    <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column" }}>
                    <label htmlFor="password" style={{ marginBottom: "4px" }}>Password</label>
                    <input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                    {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
                </div>

                <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column" }}>
                    <label htmlFor="role" style={{ marginBottom: "4px" }}>Role</label>
                    <select
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                        <option value="ORGANISER">Organiser</option>
                        <option value="FAN">Fan</option>
                        <option value="PLAYER">Player</option>
                    </select>
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
                    Register
                </button>
            </form>
        </div>
    );
}
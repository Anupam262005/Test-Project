// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate, Link } from 'react-router-dom';

// // const Signup = () => {
// //     const [formData, setFormData] = useState({
// //         username: '',
// //         password: '',
// //         role: 'analyst'
// //     });
// //     const [error, setError] = useState('');
// //     const navigate = useNavigate();

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSignup = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const res = await axios.post('http://localhost:5000/api/auth/register', formData);
// //             if (res.data.success) {
// //                 navigate('/login');
// //             }
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Signup failed');
// //         }
// //     };

// //     return (
// //         <div className="login-container">
// //             <h2>Famly Signup</h2>
// //             <form onSubmit={handleSignup}>
// //                 <div>
// //                     <label>Username:</label>
// //                     <input
// //                         type="text"
// //                         name="username"
// //                         value={formData.username}
// //                         onChange={handleChange}
// //                         required
// //                     />
// //                 </div>
// //                 <div>
// //                     <label>Password:</label>
// //                     <input
// //                         type="password"
// //                         name="password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         required
// //                     />
// //                 </div>
// //                 <div>
// //                     <label>Role:</label>
// //                     <select name="role" value={formData.role} onChange={handleChange}>
// //                         <option value="analyst">Analyst</option>
// //                         <option value="admin">Admin</option>
// //                     </select>
// //                 </div>
// //                 {error && <p style={{ color: 'red' }}>{error}</p>}
// //                 <button type="submit">Signup</button>
// //             </form>
// //             <p>
// //                 Already have an account? <Link to="/login">Login</Link>
// //             </p>
// //         </div>
// //     );
// // };

// // export default Signup;


// import React, { useState } from 'react';
// import api from '../utils/api';
// import { useNavigate, Link } from 'react-router-dom';

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         role: 'analyst'
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await api.post('/auth/register', formData);
//             if (res.data.success) {
//                 navigate('/login');
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Signup failed');
//         }
//     };

//     return (
//         <div
//             style={{
//                 height: "100vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "#e3f2fd",  // Light blue background
//             }}
//         >
//             <div
//                 style={{
//                     background: "white",
//                     padding: "35px",
//                     width: "350px",
//                     borderRadius: "12px",
//                     boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
//                     textAlign: "center"
//                 }}
//             >
//                 <h2 style={{ marginBottom: "20px", color: "#0d47a1", fontWeight: "bold" }}>
//                     Family Signup
//                 </h2>

//                 <form onSubmit={handleSignup}>
//                     <div style={{ marginBottom: "15px", textAlign: "left" }}>
//                         <label style={{ fontWeight: "bold", color: "#0d47a1" }}>Username:</label>
//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={{ marginBottom: "15px", textAlign: "left" }}>
//                         <label style={{ fontWeight: "bold", color: "#0d47a1" }}>Password:</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             style={inputStyle}
//                         />
//                     </div>

//                     <div style={{ marginBottom: "20px", textAlign: "left" }}>
//                         <label style={{ fontWeight: "bold", color: "#0d47a1" }}>Role:</label>
//                         <select
//                             name="role"
//                             value={formData.role}
//                             onChange={handleChange}
//                             style={{
//                                 ...inputStyle,
//                                 height: "40px",
//                                 cursor: "pointer"
//                             }}
//                         >
//                             <option value="analyst">Analyst</option>
//                             <option value="admin">Admin</option>
//                         </select>
//                     </div>

//                     {error && (
//                         <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
//                     )}

//                     <button
//                         type="submit"
//                         style={{
//                             width: "100%",
//                             padding: "12px",
//                             background: "#0d47a1",
//                             color: "white",
//                             fontWeight: "bold",
//                             border: "none",
//                             borderRadius: "8px",
//                             cursor: "pointer",
//                             fontSize: "16px"
//                         }}
//                     >
//                         Signup
//                     </button>
//                 </form>

//                 <p style={{ marginTop: "15px", fontWeight: "bold", color: "#0d47a1" }}>
//                     Already have an account?{" "}
//                     <Link to="/login" style={{ color: "#1565c0", fontWeight: "bold" }}>
//                         Login
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// const inputStyle = {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #64b5f6",
//     marginTop: "5px",
//     outline: "none",
//     fontSize: "15px",
//     background: "#f0f7ff",
//     fontWeight: "bold",
//     color: "#0d47a1"
// };

// export default Signup;


// import React, { useState } from "react";
// import api from "../utils/api";
// import { useNavigate, Link } from "react-router-dom";

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//         role: "analyst",
//     });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await api.post("/auth/register", formData);
//             if (res.data.success) {
//                 navigate("/login");
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Signup failed");
//         }
//     };

//     return (
//         <div
//             style={{
//                 height: "100vh",
//                 width: "100vw",
//                 overflow: "hidden",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: `url('https://static.vecteezy.com/system/resources/thumbnails/014/468/621/small/abstract-digital-technology-background-with-concept-security-vector.jpg') center/cover no-repeat`,
//                 position: "relative",
//             }}
//         >
//             {/* Blue overlay */}
//             <div
//                 style={{
//                     position: "absolute",
//                     inset: 0,
//                     background:
//                         "linear-gradient(135deg, rgba(0, 36, 82, 0.75), rgba(11, 82, 140, 0.75))",
//                     zIndex: 0,
//                 }}
//             />

//             {/* Login Card */}
//             <div
//                 style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "20px",
//                     position: "relative",
//                     zIndex: 1,
//                     padding: "40px 45px",
//                     background: "rgba(255, 255, 255, 0.10)",
//                     borderRadius: "18px",
//                     backdropFilter: "blur(15px)",
//                     boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
//                     border: "1px solid rgba(255,255,255,0.3)",
//                 }}
//             >
//                 {/* Lock Icon Section */}
//                 <div
//                     style={{
//                         paddingRight: "30px",
//                         borderRight: "1px solid rgba(255,255,255,0.25)",
//                     }}
//                 >
//                     <div
//                         style={{
//                             width: "85px",
//                             height: "85px",
//                             borderRadius: "18px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             background: "rgba(255,255,255,0.15)",
//                             border: "1px solid rgba(255,255,255,0.4)",
//                         }}
//                     >
//                         <span
//                             style={{
//                                 fontSize: "46px",
//                                 color: "white",
//                             }}
//                         >
//                             🔒
//                         </span>
//                     </div>
//                 </div>

//                 {/* Form Section */}
//                 <div style={{ width: "270px" }}>
//                     <h2
//                         style={{
//                             marginBottom: "6px",
//                             color: "#fff",
//                             fontWeight: "800",
//                             fontSize: "24px",
//                         }}
//                     >
//                         Secure Signup
//                     </h2>
//                     <p
//                         style={{
//                             marginBottom: "18px",
//                             fontSize: "12.5px",
//                             color: "rgba(255,255,255,0.85)",
//                         }}
//                     >
//                         Create your account access SOC portal.
//                     </p>

//                     <form onSubmit={handleSignup}>
//                         {/* Username */}
//                         <div style={{ marginBottom: "15px" }}>
//                             <div style={inputBox}>
//                                 <span style={iconStyle}>👤</span>
//                                 <input
//                                     type="text"
//                                     name="username"
//                                     placeholder="Enter Username"
//                                     value={formData.username}
//                                     onChange={handleChange}
//                                     required
//                                     style={inputField}
//                                 />
//                             </div>
//                         </div>

//                         {/* Password */}
//                         <div style={{ marginBottom: "15px" }}>
//                             <div style={inputBox}>
//                                 <span style={iconStyle}>🔑</span>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     placeholder="Enter Password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     required
//                                     style={inputField}
//                                 />
//                             </div>
//                         </div>

//                         {/* Role */}
//                         <div style={{ marginBottom: "20px" }}>
//                             <div style={inputBox}>
//                                 <span style={iconStyle}>🛡️</span>
//                                 <select
//                                     name="role"
//                                     value={formData.role}
//                                     onChange={handleChange}
//                                     style={{
//                                         ...inputField,
//                                         cursor: "pointer",
//                                     }}
//                                 >
//                                     <option value="analyst">Analyst</option>
//                                     <option value="admin">Admin</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Error */}
//                         {error && (
//                             <p
//                                 style={{
//                                     color: "#ffcdd2",
//                                     fontWeight: "bold",
//                                     fontSize: "13px",
//                                     marginBottom: "10px",
//                                 }}
//                             >
//                                 {error}
//                             </p>
//                         )}

//                         {/* Submit */}
//                         <button type="submit" style={loginBtn}>
//                             Sign Up
//                         </button>
//                     </form>

//                     <p
//                         style={{
//                             marginTop: "15px",
//                             fontSize: "12.5px",
//                             color: "rgba(227, 242, 253, 0.9)",
//                         }}
//                     >
//                         Already registered?{" "}
//                         <Link
//                             to="/login"
//                             style={{
//                                 color: "#ffeb3b",
//                                 fontWeight: "700",
//                                 textDecoration: "none",
//                             }}
//                         >
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Input Wrapper
// const inputBox = {
//     display: "flex",
//     alignItems: "center",
//     background: "rgba(255,255,255,0.15)",
//     borderRadius: "10px",
//     padding: "8px 12px",
//     border: "1px solid rgba(255,255,255,0.4)",
// };

// // Icon Style
// const iconStyle = {
//     fontSize: "18px",
//     color: "white",
//     marginRight: "8px",
// };

// // Input Field
// const inputField = {
//     flex: 1,
//     border: "none",
//     outline: "none",
//     background: "transparent",
//     fontSize: "14px",
//     color: "#fff",
// };

// // Button
// const loginBtn = {
//     width: "100%",
//     padding: "12px",
//     fontWeight: "700",
//     borderRadius: "10px",
//     border: "none",
//     cursor: "pointer",
//     background: "linear-gradient(135deg, #4da0ff, #004ee0)",
//     color: "white",
//     letterSpacing: "0.4px",
//     boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
//     transition: "0.25s",
// };

// export default Signup;


import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "analyst",
    });

    const [focusedInput, setFocusedInput] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (roleValue) => {
        setFormData({ ...formData, role: roleValue });
        setIsDropdownOpen(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", formData);
            if (res.data.success) {
                navigate("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                backgroundImage:
                    "url('https://static.vecteezy.com/system/resources/thumbnails/014/468/621/small/abstract-digital-technology-background-with-concept-security-vector.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                position: "relative",
            }}
        >
            {/* Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(0, 16, 42, 0.85), rgba(0, 52, 90, 0.7))",
                    zIndex: 0,
                }}
            />

            {/* Main Signup Box */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    position: "relative",
                    zIndex: 1,
                    padding: "50px",
                    background: "rgba(11, 23, 48, 0.75)",
                    borderRadius: "20px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    minWidth: "480px",
                }}
            >
                {/* Lock Icon */}
                <div
                    style={{
                        paddingRight: "30px",
                        borderRight: "1px solid rgba(255,255,255,0.2)",
                    }}
                >
                    <div
                        style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                            border: "1px solid rgba(255,255,255,0.2)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
                        }}
                    >
                        <span style={{ fontSize: "48px" }}>🔒</span>
                    </div>
                </div>

                {/* Form */}
                <div style={{ flex: 1 }}>
                    <h2
                        style={{
                            marginBottom: "8px",
                            color: "#ffffff",
                            fontWeight: "800",
                            fontSize: "28px",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Secure Signup
                    </h2>
                    <p
                        style={{
                            marginBottom: "25px",
                            fontSize: "14px",
                            color: "#b0c4de",
                        }}
                    >
                        Create your account to access the SOC portal.
                    </p>

                    <form onSubmit={handleSignup}>
                        {/* Username */}
                        <div style={{ marginBottom: "18px" }}>
                            <div
                                style={
                                    focusedInput === "username"
                                        ? { ...inputBox, ...activeInputBox }
                                        : inputBox
                                }
                            >
                                <span style={iconStyle}>👤</span>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder={
                                        focusedInput === "username" ||
                                            formData.username
                                            ? ""
                                            : "Enter Username"
                                    }
                                    value={formData.username}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput("username")}
                                    onBlur={() => setFocusedInput(null)}
                                    style={inputField}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: "18px" }}>
                            <div
                                style={
                                    focusedInput === "password"
                                        ? { ...inputBox, ...activeInputBox }
                                        : inputBox
                                }
                            >
                                <span style={iconStyle}>🔑</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={
                                        focusedInput === "password" ||
                                            formData.password
                                            ? ""
                                            : "Enter Password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)}
                                    style={inputField}
                                />
                            </div>
                        </div>

                        {/* Role Dropdown */}
                        <div style={{ marginBottom: "25px", position: "relative" }}>
                            <div
                                style={{
                                    ...inputBox,
                                    cursor: "pointer",
                                    justifyContent: "space-between",
                                }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <span style={iconStyle}>🛡️</span>
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontSize: "16px",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {formData.role}
                                    </span>
                                </div>
                                <span style={{ color: "#bbb" }}>
                                    {isDropdownOpen ? "▲" : "▼"}
                                </span>
                            </div>

                            {isDropdownOpen && (
                                <div style={dropdownMenu}>
                                    <div
                                        style={dropdownOption}
                                        onClick={() => handleRoleSelect("analyst")}
                                    >
                                        Analyst
                                    </div>
                                    <div
                                        style={dropdownOption}
                                        onClick={() => handleRoleSelect("admin")}
                                    >
                                        Admin
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p style={errorStyle}>{error}</p>
                        )}

                        {/* Submit Button */}
                        <button type="submit" style={loginBtn}>
                            CREATE ACCOUNT
                        </button>
                    </form>

                    <p style={bottomText}>
                        Already registered?{" "}
                        <Link to="/login" style={loginLink}>
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

/* ----------------- STYLES ----------------- */

const inputBox = {
    display: "flex",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.35)",
    borderRadius: "12px",
    padding: "14px 16px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    transition: "0.25s",
};

const activeInputBox = {
    border: "1px solid rgba(79, 195, 247, 0.9)",
    boxShadow: "0 0 10px rgba(79, 195, 247, 0.6)",
};

const iconStyle = {
    fontSize: "20px",
    filter: "grayscale(100%) brightness(200%)",
    marginRight: "15px",
};

const inputField = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "16px",
    color: "#fff",
};

const dropdownMenu = {
    position: "absolute",
    top: "110%",
    left: 0,
    width: "100%",
    background: "#1a2639",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    zIndex: 10,
};

const dropdownOption = {
    padding: "12px 16px",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
};

const errorStyle = {
    color: "#ff8a80",
    background: "rgba(255,0,0,0.18)",
    padding: "8px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "10px",
};

const loginBtn = {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #2196f3, #1565c0)",
    border: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "12px",
    cursor: "pointer",
};

const bottomText = {
    marginTop: "20px",
    fontSize: "14px",
    color: "#d1e3ff",
    textAlign: "center",
};

const loginLink = {
    color: "#4fc3f7",
    fontWeight: "700",
    textDecoration: "none",
};

export default Signup;
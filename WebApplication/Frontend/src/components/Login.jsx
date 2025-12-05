```javascript
import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on input change
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post("/auth/login", formData);
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/welcome");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://static.vecteezy.com/system/resources/thumbnails/014/468/621/small/abstract-digital-technology-background-with-concept-security-vector.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-blue-900/80 z-0"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-fadeIn">
                
                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                        <span className="text-4xl filter drop-shadow-lg group-hover:rotate-12 transition-transform duration-300">🔐</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Secure Portal</h2>
                    <p className="text-blue-200/80 text-sm font-medium">Enter your credentials to access</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleLogin} className="space-y-6">
                    
                    {/* Username Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider ml-1">Username</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-xl opacity-70 group-focus-within:opacity-100 transition-opacity">👤</span>
                            </div>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-black/40 transition-all duration-300"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="text-xl opacity-70 group-focus-within:opacity-100 transition-opacity">🔑</span>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-black/40 transition-all duration-300"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-blue-200/60 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors hover:underline decoration-2 underline-offset-4">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
```
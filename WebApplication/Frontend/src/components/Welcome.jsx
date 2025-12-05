// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Welcome = () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     return (
//         <div className="welcome-container">
//             <h1>Welcome to our website!</h1>
//             <p>Hello, {user.name || 'Guest'}</p>
//             <p>We are glad to have you here at Famly.</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default Welcome;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Welcome = () => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         navigate('/login');
//     };

//     return (
//         <div className="welcome-container">
//             <h1>Welcome to our website!</h1>
//             <p>Hello, {user.name || 'Guest'}</p>
//             <p>We are glad to have you here at Famly.</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default Welcome;




import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div
            className="h-screen w-screen flex justify-center items-center bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://s3-alpha.figma.com/hub/file/5153810041/484e6306-4f4a-442b-966c-cc7d1ac904ce-cover.png')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,20,50,0.85)] to-[rgba(0,60,105,0.6)] z-0"></div>

            {/* Card */}
            <div className="relative z-10 w-[90%] max-w-[520px] text-center p-12 bg-[rgba(9,22,48,0.65)] border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl animate-fadeIn">

                {/* Avatar */}
                <div className="w-[95px] h-[95px] mx-auto mb-6 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center text-[#e3f2fd] text-4xl font-extrabold shadow-xl">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* Title */}
                <h1 className="text-white font-extrabold text-3xl mb-2 tracking-wide">
                    Welcome!
                </h1>

                {/* Username */}
                <p className="text-blue-200 text-lg font-semibold mb-4 capitalize">
                    {user?.name || user?.username || "Guest"}
                </p>

                {/* Message */}
                <p className="text-white/85 text-sm mb-8 max-w-[400px] mx-auto leading-relaxed">
                    You are successfully logged in to the Family SOC Portal.
                </p>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="px-7 py-3 font-bold text-white text-[15px] rounded-xl 
                               bg-gradient-to-br from-[#ff7043] to-[#e53935] 
                               shadow-lg hover:shadow-2xl transition-all duration-300 
                               hover:-translate-y-1"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Welcome;

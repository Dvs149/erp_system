import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // ✅ Prevent access to login if already logged in
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await login({ email, password });

            // ✅ store token
            sessionStorage.setItem("token", res.token);

            // ✅ redirect
            navigate("/", { replace: true });

        } catch (err) {
            console.error(err);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back 👋
                </h2>

                {/* Form */}
                <div className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                    >
                        Login
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Login;
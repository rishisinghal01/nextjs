"use client";

import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const forgotPassword = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/user/forgotpassword", {
                email,
            });

            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
                        📧
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-white">
                    Forgot Password
                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">
                    Enter your email and we'll send you a password reset link.
                </p>

                <div className="space-y-5">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                    />

                    <button
                        onClick={forgotPassword}
                        disabled={loading}
                        className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                            loading
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
                        }`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                    {message && (
                        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-center text-cyan-300">
                            {message}
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}
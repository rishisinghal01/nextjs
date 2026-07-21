"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    async function reset() {
        try {
            const res = await axios.post("/api/user/resetpassword", {
                password,
                token,
            });

            setMessage(res.data.message);
            router.push("/login");

        } catch (error: any) {
            setMessage(error.response?.data?.error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
                        🔒
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-white">
                    Reset Password
                </h1>

                <p className="text-gray-400 text-center mt-2 mb-8">
                    Create a strong password for your account.
                </p>

                <div className="space-y-5">

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                    />

                    <button
                        onClick={reset}
                        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
                    >
                        Reset Password
                    </button>

                    {message && (
                        <div
                            className={`rounded-xl p-3 text-center font-medium ${
                                message.toLowerCase().includes("success")
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}
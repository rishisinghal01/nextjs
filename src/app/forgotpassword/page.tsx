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
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-3xl font-bold">Forgot Password</h1>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-80"
            />

            <button
                onClick={forgotPassword}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}
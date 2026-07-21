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
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-3xl">Reset Password</h1>

            <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded"
            />

            <button
                onClick={reset}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}
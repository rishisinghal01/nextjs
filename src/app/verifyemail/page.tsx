"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, settoken] = useState("");
    const [verified, setverified] = useState(false);
    const [error, seterror] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/user/verifyemail", { token });
            setverified(true);
        } catch (error: any) {
            seterror(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        settoken(urlToken || "");
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4">

            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg">
                        📩
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-center text-white">
                    Verify Email
                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">
                    We're verifying your email address.
                </p>

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

                    <p className="text-gray-400 text-sm mb-2">
                        Verification Token
                    </p>

                    <div className="break-all rounded-xl bg-black/30 p-4 text-center">
                        <span className="text-cyan-400 font-medium">
                            {token ? token : "No Token Found"}
                        </span>
                    </div>

                </div>

                {verified && (
                    <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-center">

                        <h2 className="text-2xl font-bold text-green-400">
                            ✅ Email Verified Successfully
                        </h2>

                        <p className="text-gray-300 mt-2 mb-5">
                            Your account has been verified. You can now login.
                        </p>

                        <Link
                            href="/login"
                            className="inline-block rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                        >
                            Go to Login
                        </Link>

                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center">

                        <h2 className="text-2xl font-bold text-red-400">
                            ❌ Verification Failed
                        </h2>

                        <p className="text-gray-300 mt-2">
                            The verification link is invalid or has expired.
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}
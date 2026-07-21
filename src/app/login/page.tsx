"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter();

    const [user, setuser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setbuttonDisabled] = React.useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setloading(true);

            const res = await axios.post("/api/user/login", user);

            console.log("Login success", res.data);
            toast.success("Login Success");

            router.push("/profile");

        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
                        🔐
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-white">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">
                    Login to continue
                </p>

                <div className="space-y-5">

                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm text-gray-300"
                        >
                            Email
                        </label>

                        <input
                            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                            type="email"
                            id="email"
                            value={user.email}
                            placeholder="Enter your email"
                            onChange={(e) =>
                                setuser({
                                    ...user,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm text-gray-300"
                        >
                            Password
                        </label>

                        <input
                            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                            type="password"
                            id="password"
                            value={user.password}
                            placeholder="Enter your password"
                            onChange={(e) =>
                                setuser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link
                            href="/forgotpassword"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        disabled={buttonDisabled}
                        onClick={onLogin}
                        className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                            buttonDisabled
                                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
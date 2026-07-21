"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
    const router = useRouter();

    const [user, setuser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setbuttonDisabled] = React.useState(true);
    const [loading, setloading] = React.useState(false);

    const onSignup = async () => {
        try {
            setloading(true);

            const res = await axios.post("/api/user/signup", user);

            console.log("Signup success", res.data);
            toast.success("Account created successfully!");

            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setbuttonDisabled(false);
        } else {
            setbuttonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4">

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
                        🚀
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-white">
                    Create Account
                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">
                    Join us and create your new account.
                </p>

                <div className="space-y-5">

                    <div>
                        <label
                            htmlFor="username"
                            className="text-sm text-gray-300"
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            value={user.username}
                            onChange={(e) =>
                                setuser({
                                    ...user,
                                    username: e.target.value,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm text-gray-300"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={user.email}
                            onChange={(e) =>
                                setuser({
                                    ...user,
                                    email: e.target.value,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
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
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={(e) =>
                                setuser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                            className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900/70 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled || loading}
                        className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                            buttonDisabled || loading
                                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
                        }`}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                    <p className="text-center text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}
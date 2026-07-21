"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();

    const [data, setdata] = React.useState("nothing");

    async function logout() {
        try {
            const res = await axios.get("/api/user/logout");
            console.log(res);

            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/user/me");
        console.log(res.data);
        setdata(res.data.data._id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center px-4">

            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg">
                        👤
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-center text-white">
                    Profile
                </h1>

                <p className="text-center text-gray-400 mt-2">
                    Welcome to your dashboard
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">

                    <h2 className="text-gray-400 mb-2">
                        User ID
                    </h2>

                    <div className="break-all rounded-xl bg-gray-900/80 p-4 text-center">

                        {data === "nothing" ? (
                            <span className="text-gray-500">
                                Click "Get User Details"
                            </span>
                        ) : (
                            <Link
                                href={`/profile/${data}`}
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition"
                            >
                                {data}
                            </Link>
                        )}

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">

                    <button
                        onClick={getUserDetails}
                        className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30"
                    >
                        Get Details
                    </button>

                    <button
                        onClick={logout}
                        className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/30"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}
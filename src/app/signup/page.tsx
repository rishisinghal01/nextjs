"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import axios from "axios";





export default function signup() {
    const [user, setuser] = React.useState({
        email: "",
        pasword: "",
        username: "",
    })

    const onSignup = async () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>SignUp</h1>
            <hr />
            <label htmlFor="username">UserName</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="username" value={user.username} placeholder="username" onChange={(e) => setuser({ ...user, username: e.target.value })} />
            <label htmlFor="email">Email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" value={user.email} placeholder="email" onChange={(e) => setuser({ ...user, email: e.target.value })} />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.pasword} placeholder="password" onChange={(e) => setuser({ ...user, pasword: e.target.value })} />

           <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">SignUp</button>

           <Link href="/login">Visit login page</Link>
        </div>
    )
}
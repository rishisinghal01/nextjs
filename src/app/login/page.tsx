"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";





export default function login() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        email: "",
        password: "",

    })

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
          const res = await axios.post("/api/user/login",user);
            console.log("Login success",res.data);
            toast.success("Login Success");
            router.push("/profile");

        } catch (error:any) {
                 console.log("Signup failed",error.message)
            toast.error(error.message)
        }
        finally {
            setloading(false);
        }
    }
     return loading ? (
        <div>loading</div>
    ) :(

        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>Login</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" value={user.email} placeholder="email" onChange={(e) => setuser({ ...user, email: e.target.value })} />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="password" id="password" value={user.password} placeholder="password" onChange={(e) => setuser({ ...user, password: e.target.value })} />

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login</button>

            <Link href="/signup">Visit SignUp page</Link>
        </div>
    )
}
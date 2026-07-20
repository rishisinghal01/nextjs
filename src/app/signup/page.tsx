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
            const res = await axios.post("/api/user/signup",user)
            console.log("Signup success",res.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed",error.message)
            toast.error(error.message)
        }
        finally{
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

    return loading ? (
        <div>loading</div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>SignUp</h1>
            <hr />

            <label htmlFor="username">UserName</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="username"
                value={user.username}
                placeholder="username"
                onChange={(e) =>
                    setuser({ ...user, username: e.target.value })
                }
            />

            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
                id="email"
                value={user.email}
                placeholder="email"
                onChange={(e) =>
                    setuser({ ...user, email: e.target.value })
                }
            />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="password"
                id="password"
                value={user.password}
                placeholder="password"
                onChange={(e) =>
                    setuser({ ...user, password: e.target.value })
                }
            />

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {buttonDisabled ? "No Signup" : "SignUp"}
            </button>

            <Link href="/login">Visit login page</Link>
        </div>
    );
}
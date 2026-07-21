"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
 const [data, setdata] = React.useState("nothing")
  async function logout() {
    try {
      const res = await axios.get("/api/user/logout");
      console.log(res);

      router.push("/login");  
    } catch (error:any) {
        toast.error(error.message);
      console.log(error);
    }
  }

  const getUserDetails = async()=>{
   const res = await axios.get("/api/user/me")
   console.log(res.data);  
   setdata(res.data.data._id);
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>

      <hr />
      <p>Profile page</p>
      <h2 className="p-3rounded bg-green-500 ">{data=="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />

      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4"
      >
        logout
      </button >


      <button onClick={getUserDetails}
      className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-4" >
        GetUser Details
      
      </button>
    </div>
  );
}
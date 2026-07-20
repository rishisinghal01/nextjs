import { connect } from "@/dbConfig/db";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();

        const {email,password } = reqBody;

        console.log(reqBody);
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User not exists"},{status:400});
        }

        const validpass = await bcrypt.compare(password,user.password);

        if(!validpass){
            return NextResponse.json({error:"Invalid password"},{status:400})



        }


        const tokendata = {
            id:user._id,
            username:user.username,
            email:user.email

        }

        const token = await jwt.sign(tokendata,process.env.token_secret!,{expiresIn:"1d"});

        const res = NextResponse.json({
            message:"Login Successfull",
            success:true,
        })

        res.cookies.set("token",token,{httpOnly:true})


        return res;        








        

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:502});
    }
}
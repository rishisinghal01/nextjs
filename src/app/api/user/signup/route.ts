import { connect } from "@/dbConfig/db";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";





connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,

        })

        const saving = await newUser.save();
        console.log(saving);
          await sendEmail({email,emailType:"VERIFY",userId:saving._id})
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            saving
        }

        )


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

import { connect } from "@/dbConfig/db";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User doesn't exist" },
                { status: 400 }
            );
        }

        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id,
        });

        return NextResponse.json({
            message: "Reset password email sent successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
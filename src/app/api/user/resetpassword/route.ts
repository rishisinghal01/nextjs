import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { password, token } = reqBody;

        const user = await User.findOne({
            forgetPasswordToken: token,
            forgetPasswordTokenExpiry: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid or expired token",
                },
                {
                    status: 400,
                }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;

        await user.save();
        
        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyOtpSchema } from "@/schemas/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validated = verifyOtpSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, otp } = validated.data;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User profile not found." },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: "Account is already verified." },
        { status: 200 }
      );
    }

    if (!user.otpCode || user.otpCode !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP verification code." },
        { status: 400 }
      );
    }

    if (user.otpExpiry && new Date() > user.otpExpiry) {
      return NextResponse.json(
        { error: "OTP verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Update verification status
    await db.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Your email has been successfully verified! You can now log in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

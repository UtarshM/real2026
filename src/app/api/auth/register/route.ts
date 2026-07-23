import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signupSchema } from "@/schemas/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate inputs
    const validated = signupSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, name, role } = validated.data;

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email address." },
        { status: 400 }
      );
    }

    // Mock Hash (or use bcrypt)
    const passwordHash = `hash_${password}`;

    // Create user
    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
        role,
        isVerified: false, // OTP verification required
        otpCode: Math.floor(100000 + Math.random() * 900000).toString(), // 6-digit OTP
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
      },
    });

    // Create default profile
    await db.profile.create({
      data: {
        userId: user.id,
        bio: `Hi, I am a ${role.toLowerCase()} on AddressBox.`,
      },
    });

    // If builder, agent or agency - initialize corresponding profiles
    if (role === "AGENT") {
      await db.agent.create({
        data: { userId: user.id },
      });
    } else if (role === "BUILDER") {
      await db.builder.create({
        data: { userId: user.id, companyName: `${name}'s Projects Llp` },
      });
    } else if (role === "AGENCY") {
      await db.agency.create({
        data: { userId: user.id, name: `${name} Agency` },
      });
    }

    return NextResponse.json(
      {
        message: "Registration successful. Please verify your OTP to activate account.",
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email address" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Map role enum string
    let userRole: Role = Role.BUYER;
    if (role === "SELLER") userRole = Role.SELLER;
    else if (role === "AGENT") userRole = Role.AGENT;
    else if (role === "BUILDER") userRole = Role.BUILDER;

    // Create user in Supabase via Prisma
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: userRole,
        isVerified: true,
        profile: {
          create: {
            bio: `${name || "Registered user"} on Address Box`,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    console.error("User registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 500 }
    );
  }
}

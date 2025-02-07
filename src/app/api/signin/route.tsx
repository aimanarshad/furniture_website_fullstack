/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from "bcrypt";
import * as jose from "jose";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

// Ensure JWT Secret is defined
const JWT_SECRET = process.env.SECRET_KEY;
if (!JWT_SECRET) throw new Error("SECRET_KEY is not set in environment variables.");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Fetch user from Sanity
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Generate JWT token
    const token = await new jose.SignJWT({ id: user._id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Respond with token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error in sign-in route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

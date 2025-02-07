/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import bcrypt from "bcrypt";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

// Ensure environment variable is defined
const JWT_SECRET = process.env.SECRET_KEY;
if (!JWT_SECRET) throw new Error("SECRET_KEY is missing in environment variables.");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Sanity
    await client.create({
      _type: "user",
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

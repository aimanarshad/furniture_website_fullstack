/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import * as jose from "jose";
import { cookies } from "next/headers";
import { createClient } from "@sanity/client";
import bcrypt from "bcrypt"; // Import bcrypt for password comparison

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

const handleSubmitForm = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form data
  if (!email || !password) {
    return "Email and password are required.";
  }

  // Fetch user data from Sanity
  const query = `*[_type == "user" && email == $email][0]`; // Only fetch user by email
  const params = { email };

  const user = await sanityClient.fetch(query, params);

  if (!user) {
    console.log("User not found with email:", email);
    return "Invalid email or password.";
  }

  // Check if password exists for the user record
  if (!user.password) {
    console.log("Password field is missing for the user:", email);
    return "Invalid email or password.";
  }

  // Compare the entered password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password); // user.password is the hashed password in Sanity

  if (!isPasswordValid) {
    console.log("Password validation failed for email:", email);
    return "Invalid email or password.";
  }

  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const alg = "HS256";

  const token = await new jose.SignJWT()
    .setProtectedHeader({ alg })
    .setExpirationTime("2h")
    .sign(secret);
  console.log(token);

  // cookie

  cookies().set("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Secure cookie only in production
    path: "/",
    maxAge: 2 * 60 * 60, // 2 hours
  });

  redirect("/cart");
};
export default handleSubmitForm;

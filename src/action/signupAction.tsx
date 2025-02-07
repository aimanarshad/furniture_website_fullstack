/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { client } from "@/sanity/lib/client"; // Adjust the path based on your project structure
import bcrypt from "bcrypt";

const handleSubmitForm = async (prevState: any, formData: FormData) => {
  try {
    // Retrieve form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate form data
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    // Check if the user already exists in Sanity
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return {
        success: false,
        message: "User already exists with this email.",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = {
      _type: "user",
      name,
      email,
      password: hashedPassword,
    };

    // Add the user to Sanity
    const createdUser = await client.create(userData);

    return {
      success: true,
      message: "User registered successfully!",
      user: createdUser,
    };
  } catch (error) {
    console.error("Error during form submission:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export default handleSubmitForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import handleSubmitForm from "@/action/signupAction";
import Link from "next/link";
import { useFormState } from "react-dom";
import Image from "next/image";

export default function Signup() {
  const [formState, formAction] = useFormState(handleSubmitForm, undefined);
  return (
    <div className="flex h-screen bg-[#F5F5DC] items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg flex w-3/4 max-w-4xl h-auto md:h-4/6 overflow-hidden">
        {/* Left Side Image */}
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/img.jpg"
            alt="Travel"
            layout="fill"
            objectFit="cover"
            className="rounded-l-lg"
          />
          <div className="absolute bottom-5 left-5 text-black text-lg">
            <h2 className="text-2xl font-bold">Travelista Tours</h2>
            <p>
              Travel is the only purchase that enriches you beyond material
              wealth
            </p>
          </div>
        </div>
        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6 text-center">
            Sign Up
          </h2>
          <p className="mb-4 text-gray-700 text-center">Create your account</p>
          <form action={formAction} className="space-y-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your username"
              className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-[#8B5E3C] text-white py-2 rounded-lg hover:bg-[#6B4226] cursor-pointer"
            />
          </form>
          <div className="text-center text-lg mt-4">
            <p className="text-gray-700">
              Already have an account?
              <Link href="/signin" className="text-yellow-500 hover:underline">
                {" "}
                Login
              </Link>
            </p>
          </div>
          <div className="text-sm text-red-500 mt-2 hidden" id="emailError">
            Error message
          </div>
          {formState && (
            <p className="text-center text-red-500 mt-2">{formState.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

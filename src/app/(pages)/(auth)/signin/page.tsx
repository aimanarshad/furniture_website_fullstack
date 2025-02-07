'use client'
import handleSubmitForm from "@/action/signinAction";
import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import Logout from "../../component/Logout";
export default function SignIn() {
    const [formState, formAction] = useFormState(handleSubmitForm,undefined)
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
            <p>Travel is the only purchase that enriches you beyond material wealth</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6 text-center">Welcome</h2>
                <p className="mb-4 text-gray-700 text-center">Login with Email</p>
            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                    type="text"
                    name="email"
                    id="email"
                    className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                    placeholder="Enter your email"
                    />

                        <div className="text-sm text-red-500 mt-1 hidden" id="emailError">error</div>

                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                    placeholder="Enter your password"
                    />

                    <div className="text-sm text-red-500 mt-1 hidden" id="passwordError">error</div>

                </div>
                <div>
                    <input
                    type="submit"
                    value="Login"
                    className="w-full bg-[#8B5E3C] text-white py-2 rounded-lg hover:bg-[#6B4226] cursor-pointer"
                    />
                </div>
                <div className="mt-4 text-center">
            <button className="bg-[#eebc32] w-full text-white py-2 px-6 rounded-lg hover:bg-[#8B5E3C] transition-all duration-300">
                <Link href={'/signup'}> Create Account</Link>
             
            </button>
            <Logout/>
          </div>
            </form>
            </div>
            <div className="text-sm text-red-500 mt-2 hidden" id="emailError">message here</div>
            {formState && <p>{formState}</p>}
            
        </div>
        </div>
    );
}












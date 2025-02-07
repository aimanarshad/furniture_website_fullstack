/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import FeedbackDialog from "../../component/feetback";
import Image from "next/image";

// Function to fetch the latest user data
const fetchLatestUserData = async () => {
  const userData = await client.fetch(`
    *[_type == "customer"] | order(_createdAt desc)[0]{
      _id,
      name,
      address,
      phone,
      email
    }
  `);
  return userData;
};

export default function UserInfo() {
  const [user, setUser] = useState<any>(null);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);

  useEffect(() => {
    // Fetch the latest user data when the component mounts
    fetchLatestUserData().then((data) => {
      setUser(data);
    });
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  const openFeedbackDialog = () => {
    setFeedbackOpen(true);
  };

  const closeFeedbackDialog = () => {
    setFeedbackOpen(false);
  };

  return (
    <>
    <div
            style={{ backgroundImage: "url('/img.jpg')" }}
            className="bg-cover bg-center h-[330px] opacity-80 w-full relative mt-[100px]"
          >
            <div className="absolute top-[60px] left-[50%] transform -translate-x-1/2 text-center">
              <Image
                className="w-[77px] h-[77px]"
                src="/logo.png"
                alt="logo"
                width={70}
                height={60}
              />
              <h1 className="text-[48px] font-medium leading-[72px] text-5xl">
                User Detail
              </h1>
              <div className="flex justify-center gap-3 items-center text-sm mt-[5px]">
                <span className="font-bold">Home</span>
                <Image
                  src="/arrow.png"
                  alt="arrow"
                  width={30}
                  height={15}
                  className="w-[30px] h-[15px]"
                />
                <span className="font-bold text-black">Users</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center bg-[#F5F5DC] min-h-screen py-12 px-6">
  <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full border border-[#D2B48C]">
    {/* Header */}
    <h1 className="text-3xl font-bold text-[#5A3E36] mb-6 text-center">User Information</h1>

    {/* User Details */}
    <div className="space-y-4 text-[#6D4C41]">
      <p>
        <span className="font-semibold text-[#4E342E]">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold text-[#4E342E]">Address:</span> {user.address}
      </p>
      <p>
        <span className="font-semibold text-[#4E342E]">Phone:</span> {user.phone}
      </p>
      <p>
        <span className="font-semibold text-[#4E342E]">Email:</span> {user.email}
      </p>
    </div>

    {/* View Order Link */}
    <Link
      href={`/userInfo/${user._id}`}
      className="block mt-6 text-center text-[#8B5E3B] font-semibold hover:text-[#6D4C41] transition duration-200"
    >
      View Order
    </Link>

    {/* Feedback Button */}
    <button
      className="w-full bg-[#8B5E3B] text-white font-semibold py-3 rounded-lg mt-6 hover:bg-[#6D4C41] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#D2B48C]"
      onClick={openFeedbackDialog}
    >
      Give Feedback
    </button>
  </div>

  {/* Feedback Dialog */}
  <FeedbackDialog isOpen={isFeedbackOpen} onClose={closeFeedbackDialog} />
</div>

    </>
  );
}

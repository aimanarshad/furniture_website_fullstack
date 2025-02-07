"use client";
import Image from "next/image";
import Features from "../../component/features";
import { useState } from "react";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show the modal when the form is submitted
    setIsModalOpen(true);

    // Optionally, close the modal after 3 seconds
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <div>
      <div
        style={{ backgroundImage: "url('/img.jpg')" }}
        className="bg-cover bg-center h-[330px] opacity-80 w-full relative mt-[100px]"
      >
        <div className="absolute top-[60px] left-[50%] transform -translate-x-1/2">
          <Image
            className="w-[77px] h-[77px] top-[30px] left-[682px]"
            src="/logo.png"
            alt="logo"
            width={70}
            height={60}
          />
          <h1 className="text-[48px] font-medium leading-[72px] text-5xl text-left top-0">Contact</h1>
          <div className="w-[145px] h-[24px] flex flex-row gap-7 top-[295px] left-[680px]">
            <span className="font-bold text-sm">Home</span>
            <Image
              src="/arrow.png"
              alt="arrow"
              width={100}
              height={100}
              className="w-[30px] h-[15px] top-[150px] left-[37px] absolute"
            />
            <span className="font-bold text-sm text-black">Contact</span>
          </div>
        </div>
      </div>
      <div className="mt-[170px] flex flex-col text-center justify-center">
        <h1 className="text-2xl font-bold text-center lg:text-center">
          Get In Touch With Us
        </h1>
        <p className="text-sm text-gray-600 text-center lg:text-center mt-2">
          For More Information About Our Product & Services, Please Feel
          <br />
          Free To Drop Us An Email. Our Staff Always Be There To Help You
          <br />
          Out. Do Not Hesitate!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center mt-[100px] items-start space-y-8 lg:space-y-0 lg:space-x-16 top-[705px] gap-[100px] left-[191px] p-8">
        <div className="space-y-6 flex flex-col gap-[25px]">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/location.png"
                alt="logo"
                width={30}
                height={30}
                className="leading-[41.45px]"
              />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm text-gray-600">
                  23B 5th St Avenue,
                  <br />
                  New York NY10000,
                  <br />
                  United States
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src="/phone.png"
                alt="logo"
                width={30}
                height={30}
              />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm text-gray-600">
                  Mobile: (+84) 546-6789 <br /> Hotline: (+84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src="/clock.png"
                alt="logo"
                width={30}
                height={30}
                className="leading-[41.45px]"
              />
              <div>
                <p className="font-semibold">Working Time</p>
                <p className="text-sm text-gray-600">
                  Monday-Friday:
                  <br />
                  9:00 - 22:00 <br /> Saturday-Sunday:
                  <br />
                  9:00 -
                  21:00
                </p>
              </div>
            </div>
          </div>
        </div>
        <form
          className="w-full lg:w-1/2 top-[637px] flex flex-col gap-[30px] space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="text-sm font-semibold text-black" htmlFor="name">
              Your Name
            </label>
            <br />
            <br />
            <input
              id="name"
              type="text"
              placeholder="Abc"
              className="w-full p-3 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black" htmlFor="email">
              Email Address
            </label>
            <br />
            <br />
            <input
              id="email"
              type="email"
              placeholder="Abc@gmail.com"
              className="w-full p-3 border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600" htmlFor="subject">
              Subject
            </label>
            <br />
            <br />
            <input
              id="subject"
              type="text"
              placeholder="This is an optional"
              className="w-full p-3 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#B88E2F]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black" htmlFor="message">
              Message
            </label>
            <br />
            <br />
            <textarea
              id="message"
              placeholder="Hi! I'd like to ask about..."
              className="w-full p-3 border rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#B88E2F] h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#B88E2F] hover:bg-[#B88E2F] text-white py-3 rounded-lg font-semibold"
          >
            Submit
          </button>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-yellow-700 p-6 rounded-lg w-96">
              <h3 className="text-xl font-bold text-white">
                Contact details sent successfully!
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Features />
    </div>
  );
}

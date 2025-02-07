"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // For mobile menu icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h1 className="text-2xl font-bold text-gray-900">Furniro</h1>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium text-gray-800">
          <li className="hover:text-gray-600 transition">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-600 transition">
            <Link href="/shop">Shop</Link>
          </li>
          <li className="hover:text-gray-600 transition">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="hover:text-gray-600 transition">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Icons and Buttons Section */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            className="text-white bg-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-800 transition duration-300"
            href="/signup"
          >
            Create Account
          </Link>
          <Link
            className="bg-[#B88E2F] text-white py-2 px-4 rounded hover:bg-[#6B4226] transition duration-300"
            href="/signin"
          >
            Login
          </Link>
          <Link href="/userInfo" className="bg-[#B88E2F] text-white py-2 px-4 rounded">
            Your Account
          </Link>

          <Image src="/search.png" alt="Search" width={30} height={30} className="cursor-pointer hover:opacity-80" />
          <Image src="/heart.png" alt="Favorites" width={30} height={30} className="cursor-pointer hover:opacity-80" />
          <Image src="/cart.png" alt="Cart" width={40} height={40} className="cursor-pointer hover:opacity-80" />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6">
          <ul className="flex flex-col space-y-3 text-lg font-medium text-gray-800">
            <li className="hover:text-gray-600 transition">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-gray-600 transition">
              <Link href="/shop">Shop</Link>
            </li>
            <li className="hover:text-gray-600 transition">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="hover:text-gray-600 transition">
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link className="block w-full text-center text-white bg-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-800 transition duration-300" href="/signup">
                Create Account
              </Link>
            </li>
            <li>
              <Link className="block w-full text-center bg-[#B88E2F] text-white py-2 px-4 rounded hover:bg-[#6B4226] transition duration-300" href="/signin">
                Login
              </Link>
            </li>
            <li>
              <Link className="block w-full text-center bg-[#B88E2F] text-white py-2 px-4 rounded hover:bg-[#6B4226]" href="/userInfo">
                Your Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

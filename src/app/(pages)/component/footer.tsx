/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link'

export default function Footer() {
  return (
    <div>

      {/* Footer */}
      <footer className="bg-white text-gray-800 mt-[20px]">
        <div className="container w-[1350px] h-[300px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 w-[1201.5px] h-[250px] mt-[3px] gap-[20px]">
            {/* Company Information */}
            <div>
              <h1 className="text-2xl font-bold">Funiro.</h1>
              <p className="mt-4">
                400 University Drive Suite 200 Coral Gables, <br />
                FL 33134 USA
              </p>
            </div>

            {/* Links */}
            <div className="w-[68px] h-[312px] flex flex-col gap-[30px]">
              <h2 className="text-lg font-semibold">Links</h2>
              <ul className="flex flex-col gap-[30px]">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:underline">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="w-[140px] h-[242px] flex flex-col gap-[30px]">
              <h2 className="text-lg font-semibold mb-3">Help</h2>
              <ul className="flex flex-col gap-[30px]">
                <li>
                  <Link href="#" className="hover:underline">
                    Payment Options
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="w-[286px] flex flex-col gap-[30px]">
              <h2 className="text-lg font-semibold mb-3">Newsletter</h2>
              <div className="flex gap-4">
                <div className="text-black text-sm">
                  <span>Enter your email</span>
                  <div className="w-[100px] h-[2px] border-[1px] border-black"></div>
                </div>
                <div className="text-black text-sm font-bold">
                  <span>SUBSCRIBE</span>
                  <div className="w-[100px] h-[2px] border-[1px] border-black"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-4 text-left text-lg">
            <p>2023 Funiro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";



import React from "react";

export default function AdminPanel() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-center border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li>
              <Link href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href={"/users"} className="block py-2 px-4 rounded hover:bg-blue-700">
                Users
              </Link>
            </li>
            <li>
              <Link href={"/orders"} className="block py-2 px-4 rounded hover:bg-blue-700">
                Orders
              </Link>
            </li>
            <li>
              <Link href={"/newProduct"} className="block py-2 px-4 rounded hover:bg-blue-700">
                Products
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-700 text-center">
          <button className="w-full py-2 px-4 bg-red-500 rounded hover:bg-red-600">
            <Link href={'/'}>
            Logout
            </Link>
           
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-6">Welcome to the Admin Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Users</h3>
            <p className="text-3xl font-semibold mt-4">1,234</p>
          </div>
          {/* Card 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Orders</h3>
            <p className="text-3xl font-semibold mt-4">567</p>
          </div>
          {/* Card 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Revenue</h3>
            <p className="text-3xl font-semibold mt-4">$12,345</p>
          </div>
        </div>
      </main>
    </div>
  );
}


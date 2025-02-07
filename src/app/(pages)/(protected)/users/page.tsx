/* eslint-disable @typescript-eslint/no-explicit-any */

import { client } from "@/sanity/lib/client";

const getUsers = async () => {
  const users = await client.fetch(`
    *[_type == "customer"] {
      _id, name, phone, country, email, _createdAt
    }
  `);
  return users;
};

export default async function Users() {
  const allUsers = await getUsers();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUsers.map((items: any) => (
          <div
            key={items._id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-900">
              Name: {items.name}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Phone:</span> {items.phone}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Email:</span> {items.email}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Country:</span> {items.country}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(items._createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { client } from "@/sanity/lib/client";

const getOrder = async () => {
  const order = await client.fetch(`
    *[_type == "order"] {
      _id,
      order_date,
      customer->{
        name
      },
      items[] {
        product_price,
        _type
      }
    }
  `);
  return order;
};

export default async function Order() {
  const allOrder = await getOrder();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Order Summary</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((order: any) =>
              order.items.map((item: any, index: number) => (
                <tr key={`${order._id}-${index}`} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.customer.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item._type}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.product_price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

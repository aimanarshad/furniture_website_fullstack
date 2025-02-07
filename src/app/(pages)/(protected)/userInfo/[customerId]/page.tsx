/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// Function to fetch order details based on the customerId
const fetchOrders = async (customerId: string) => {
  const orders = await client.fetch(`
    *[_type == "order" && customer._ref == "${customerId}"]{
      _id,
      order_date,
      items[] {
        product_price,
        quantity,
        _type
      }
    }
  `);
  return orders;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve customerId directly from the URL using router (dynamic route)
    const pathSegments = window.location.pathname.split('/');
    const customerIdFromURL = pathSegments[pathSegments.length - 1]; // Last segment should be the customerId
    setCustomerId(customerIdFromURL);
  }, []);

  useEffect(() => {
    // Fetch orders when customerId is available
    if (customerId) {
      fetchOrders(customerId).then((data) => {
        setOrders(data);
      });
    }
  }, [customerId]);

  if (!customerId) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Orders for Customer {customerId}
      </h1>

      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order: any) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
              <p className="text-gray-600">
                Order Date:{" "}
                <span className="font-medium text-gray-800">
                  {new Date(order.order_date).toLocaleDateString()}
                </span>
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Items:</h3>
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">Price:</span> ${item.product_price}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Quantity:</span> {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No orders found for this customer.</p>
      )}
    </div>
  );
}

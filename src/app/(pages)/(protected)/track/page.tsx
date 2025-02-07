/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const TrackPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    setError(""); // Clear any previous errors
    setTrackingData(null); // Clear previous results

    if (!trackingNumber) {
      setError("Please enter a tracking number.");
      return;
    }

    try {
      const response = await fetch(`/api/track?trackingNumber=${trackingNumber}`);
      const data = await response.json();
    
      if (response.ok && data.customer) {
        setTrackingData(data); // Store fetched data (including both customer and order)
      } else {
        setError(data.error || "No data found for this tracking number.");
      }
    } catch {
      setError("An error occurred while fetching the data. Please try again.");
    }
  };

  return (
    <div className="relative w-full mt-[100px]">
      {/* Background Image */}
      <div
        className="bg-cover bg-center h-[330px] w-full relative flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/img.jpg')" }}
      >
        <Image src="/logo.png" alt="logo" width={80} height={70} className="mb-4" />
        <h1 className="text-[48px] font-semibold text-brown-900">Track Order</h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-gold-500 font-bold text-sm">home</span>
          <Image src="/arrow.png" alt="arrow" width={30} height={15} />
          <span className="text-brown-800 font-bold text-sm">Track</span>
        </div>
      </div>

      {/* Tracking Section */}
      <div className="mt-16 flex flex-col items-center justify-center bg-[#f7f6f4] p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-brown-900 mb-4">Track Your Order</h2>
        <div className="w-full bg-[#e4d7bf] p-6 rounded shadow-md">
          <input
            type="text"
            placeholder="Enter your tracking number"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gold-400"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button
            onClick={handleTrack}
            className="w-full bg-gold-500 text-lg text-white py-2 rounded hover:bg-gold-600 transition duration-300 bg-[#cc942b]"
          >
            Track
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {trackingData && (
          <div className="mt-6 p-6 bg-[#f0d17e] rounded shadow w-full text-[#312f29]">
            <h2 className="text-xl font-bold text-brown-900">Tracking Details</h2>
            <p><strong>Tracking Number:</strong> {trackingData.customer.trackingNumber}</p>
            <p><strong>Name:</strong> {trackingData.customer.name}</p>
            <p><strong>Address:</strong> {trackingData.customer.address}</p>
            <p><strong>Weight:</strong> {trackingData.customer.weight}</p>

            <h3 className="mt-6 text-lg font-semibold text-brown-900">Order Details</h3>
            {trackingData.order ? (
              <>
                <p><strong>Order ID:</strong> {trackingData.order._id}</p>
                <p><strong>Order Date:</strong> {new Date(trackingData.order.order_date).toLocaleDateString()}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {trackingData.order.items.map((item: any, index: number) => (
                    <li key={index} className="text-brown-700">
                      <strong>{item.product_name}</strong> - ${item.product_price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-brown-700">No order found for this customer.</p>
            )}
          </div>
        )}

        <button className="bg-yellow-950 text-yellow-200 py-2 px-6 rounded-lg hover:bg-gold-700 transition duration-300 mt-6">
          <Link href="/" className="inline-block">
            Go Back to Shopping
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TrackPage;

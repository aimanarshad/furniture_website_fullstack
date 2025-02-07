/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Features from "../../component/features";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "../../../(context)/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Cart() {
  const { cart, handleRemoveFromCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [subtotals, setSubtotals] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize quantities and subtotals
  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    const initialSubtotals: { [key: string]: number } = {};
    cart.forEach((item: any) => {
      initialQuantities[item._id] = 1; // Default quantity is 1
      initialSubtotals[item._id] = item.price; // Subtotal is the price initially
    });
    setQuantities(initialQuantities);
    setSubtotals(initialSubtotals);
  }, [cart]);

  // Calculate total price whenever subtotals change
  useEffect(() => {
    const total = Object.values(subtotals).reduce((sum, sub) => sum + sub, 0);
    setTotalPrice(total);
  }, [subtotals]);

  const handleQuantityChange = (
    itemId: string,
    newQuantity: number,
    price: number
  ) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
    setSubtotals((prev) => ({ ...prev, [itemId]: newQuantity * price }));
  };

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/product">
          <a className="text-blue-500 underline">Go back to shopping</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        style={{ backgroundImage: "url('/img.jpg')" }}
        className="bg-cover bg-center h-[330px] opacity-80 w-full relative mt-[100px]"
      >
        <div className="absolute top-[60px] left-[50%] transform -translate-x-1/2 text-center">
          <Image
            className="mx-auto w-[77px] h-[77px]"
            src="/logo.png"
            alt="logo"
            width={70}
            height={60}
          />
          <h1 className="text-[48px] font-medium leading-[72px] text-5xl">
            Cart
          </h1>
          <div className="flex justify-center items-center gap-3 mt-2">
            <span className="font-bold text-sm">Home</span>
            <Image src="/arrow.png" alt="arrow" width={15} height={10} />
            <span className="font-bold text-sm text-black">Cart</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-12 justify-between p-6 bg-white">
        {/* Cart Table */}
        <div className="w-full lg:w-2/3">
          <table className="w-full border-collapse bg-amber-50">
            <thead>
              <tr className="text-left text-gray-600 bg-amber-100">
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: any) => (
                <tr key={item._id} className="border-b">
                  <td className="p-4 flex items-center">
                    <Image
                      src={
                        item.productImage
                          ? urlFor(item.productImage).url()
                          : "/placeholder.png"
                      }
                      alt={item.title || "Product"}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded mr-4"
                    />
                    <span className="text-gray-800">{item.title}</span>
                  </td>
                  <td className="p-4 text-gray-700">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={quantities[item._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          item._id,
                          parseInt(e.target.value),
                          item.price
                        )
                      }
                      className="w-12 border rounded text-center text-gray-700"
                    />
                  </td>
                  <td className="p-4 text-gray-700">
                    ${subtotals[item._id]?.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Totals */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:ml-8">
          <div className="p-6 bg-amber-50 border rounded">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Cart Totals
            </h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-bold mb-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-black text-white py-2 rounded text-center"
            >
              Check Out
            </Link>
          </div>
        </div>
      </div>

      <Features />
    </>
  );
}

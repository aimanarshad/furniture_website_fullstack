/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { getProducts } from "@/utils/fetchData";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default async function Example() {
  const products = await getProducts();

  return (
    <>
      <section className="w-full max-w-[1236px] mx-auto mt-[50px]">
        <h1 className="text-[60px] text-center font-bold mb-[50px] text-gray-900">Related Goods</h1>

        <div className="flex flex-wrap justify-start gap-[30px]">
          {/* Product Cards */}
          {products.map((item: any) => (
            <div
              key={item.id}
              className="relative bg-white shadow-lg rounded-lg p-6 border border-gray-200 overflow-hidden group hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              {/* Product Image with hover effect */}
              <div className="relative">
                <Image
                  src={urlFor(item.productImage).url()}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="rounded-lg mx-auto mb-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                {/* View Details Button (hidden until hover) */}
                <Link
                  href={`/shop/${item.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span>View Details</span>
                </Link>
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-lg font-medium text-indigo-600">${item.price}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.discountPercentage
                    ? `Discount: ${item.discountPercentage}%`
                    : "No discount"}
                </p>
                <p
                  className={`text-sm font-medium mt-2 ${
                    item.isNew ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {item.isNew ? "New Product" : "Existing Product"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

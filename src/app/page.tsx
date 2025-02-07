/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Features from "./(pages)/component/features";
import Link from "next/link";
import { getProducts } from "@/utils/fetchData";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  id: string;
  title: string;
  price: number;
  discountPercentage: number;
  isNew: boolean;
  tags: string[];
  productImage: any;
}

export default async function Home() {
  const product: Product[] = await getProducts();

  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {/* Banner Section */}
      <div
        className="relative w-full h-[300px] sm:h-[350px] mt-[100px] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: 'url("/img2.jpg")' }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-[#FFF3E3] text-[#B88E2F] py-6 px-4 sm:py-8 sm:px-12 rounded-lg w-[90%] sm:w-[70%] md:w-[50%]">
          <h2 className="text-lg sm:text-2xl md:text-3xl mb-4">Discover Our New Collection</h2>
          <p className="text-sm sm:text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="space-x-2 sm:space-x-4">
            <Link href="/shop" className="bg-[#B88E2F] text-white py-2 px-4 rounded">
              Shop Now
            </Link>
            <Link href="/userInfo" className="bg-[#B88E2F] text-white py-2 px-4 rounded">
              Your Account
            </Link>
          </div>
        </div>
      </div>

      {/* Product Showcase */}
      <section className="text-center mt-12">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Browse The Range</h2>
          <p className="text-sm sm:text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Dining", "Living", "Bedroom"].map((category, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-300 rounded text-center hover:shadow-lg transition"
            >
              <Image
                src={`/img${idx + 3}.png`}
                alt={`Image for ${category} category`}
                width={480}
                height={480}
                className="mx-auto mb-4"
              />
              <p className="font-bold text-lg">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Goods */}
      <section>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-8">Related Goods</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.map((item) => (
              <div
                key={item.id}
                className="relative bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-gray-200 group hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={urlFor(item.productImage).url()}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="rounded-xl mx-auto mb-6 transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <Link
                    href={`/shop/${item.id}`}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View Details
                  </Link>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-sm sm:text-lg font-semibold text-indigo-600 mt-2">
                    ${item.price}
                  </p>
                  {item.discountPercentage && (
                    <p className="text-xs text-red-500 mt-1">
                      Discount: {item.discountPercentage}%
                    </p>
                  )}
                  <p
                    className={`text-sm font-medium mt-2 ${item.isNew ? "text-green-600" : "text-gray-500"}`}
                  >
                    {item.isNew ? "New Product" : "Existing Product"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 mt-2">
                    Tags: {item.tags?.join(", ") || "No tags available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="mt-16">
        <h4 className="text-sm sm:text-lg text-center text-gray-800">Share your Setup with us</h4>
        <h1 className="text-2xl sm:text-[40px] text-center font-bold text-[#3A3A3A] mt-2">
          #FuniroFurniture
        </h1>
        <div className="flex justify-center mt-6">
          <Image
            src="/fu.png"
            alt="Funiro Furniture setup"
            width={780}
            height={500}
            className="w-full max-w-[1350px] h-[300px] sm:h-[500px] object-cover"
          />
        </div>
      </section>

      <Features />
    </div>
  );
}

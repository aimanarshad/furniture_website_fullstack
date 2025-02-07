/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Image from "next/image";
import Features from "../../component/features";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import { getProducts } from "@/utils/fetchData";
import Link from "next/link";
import PriceFilter from "../../component/filter"; // Import the PriceFilter component
import type { Product } from "@/app/type/product";

const fetchProducts = async () => {
  const products = await getProducts(); // Fetch products from Sanity
  return products;
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // Fetch the products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    fetchData();
  }, []);

  // Handle search logic for filtering products
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product: Product) => {
      const nameMatch = product?.title.toLowerCase().includes(query);
      const tagsMatch =
        product?.tags?.some((tag: string) =>
          tag?.toLowerCase().includes(query)
        ) || false;

      return nameMatch || tagsMatch;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Apply price filter logic
  const applyPriceFilter = (minPrice: number, maxPrice: number) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);

    const filtered = products.filter((product) => {
      return product.price >= minPrice && product.price <= maxPrice;
    });

    setFilteredProducts(filtered);
  };

  return (
    <>
      <div
        style={{ backgroundImage: "url('/img.jpg')" }}
        className="bg-cover bg-center h-[330px] opacity-80 w-full relative mt-[100px]"
      >
        <div className="absolute top-[60px] left-[50%] transform -translate-x-1/2 text-center">
          <Image
            className="w-[77px] h-[77px]"
            src="/logo.png"
            alt="logo"
            width={70}
            height={60}
          />
          <h1 className="text-[48px] font-medium leading-[72px] text-5xl">
            Shop
          </h1>
          <div className="flex justify-center gap-3 items-center text-sm mt-[5px]">
            <span className="font-bold">Home</span>
            <Image
              src="/arrow.png"
              alt="arrow"
              width={30}
              height={15}
              className="w-[30px] h-[15px]"
            />
            <span className="font-bold text-black">Shop</span>
          </div>
        </div>
      </div>

      <main>
        <div className="font-sans p-8">
          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-[#b6a87b] text-white p-3 rounded-full shadow-md w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="bg-transparent w-full outline-none placeholder-white text-white px-3"
              />
              <button
                className="ml-2 bg-[#5D4037] text-white px-4 py-2 rounded-full hover:bg-[#3E2723] transition duration-300"
              >
                🔍
              </button>
            </div>
          </div>

          {/* Price Filter Component */}
          <PriceFilter onFilterChange={applyPriceFilter} />

          {/* Product Grid Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 ml-[16rem]">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item: Product) => (
                <div
                  key={item.id}
                  className="relative bg-white shadow-lg rounded-lg p-4 border border-gray-200 overflow-hidden group"
                >
                  {/* Image with hover effect */}
                  <div className="relative">
                    <Image
                      src={urlFor(item.productImage).url()}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="rounded-lg mx-auto mb-4"
                    />
                    {/* View Details Button (hidden until hover) */}
                    <Link
                      href={`/shop/${item.id}`}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-lg font-semibold text-gray-800">
                      ${item.price}
                    </p>
                    <p className="text-xs text-red-500">
                      Discount:{" "}
                      {item.dicountPercentage
                        ? `${item.dicountPercentage}%`
                        : "N/A"}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        item.isNew ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {item.isNew ? "New Product" : "Existing Product"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Tags:{" "}
                      {item.tags && item.tags.length > 0
                        ? item.tags.join(", ")
                        : "No tags available"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No products found matching your search or price filter.
              </p>
            )}
          </div>
        </div>
      </main>

      <Features />
    </>
  );
}

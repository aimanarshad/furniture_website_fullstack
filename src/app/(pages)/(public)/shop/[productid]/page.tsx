/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProductReviews from "@/app/(pages)/component/comments";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { productid: string } }) {
    const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);  // Store reviews locally

  const { productid } = params;

  // Retrieve reviews from local storage when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productid) return;

        const fetchedProduct = await client.fetch(
          `*[_type == "product" && id == $productid][0]`,
          { productid: parseInt(productid) }
        );

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          // Load reviews from local storage if they exist
          const storedReviews = JSON.parse(localStorage.getItem(`reviews-${productid}`) || "[]");
          setReviews(storedReviews);  // Set reviews from local storage or empty array
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, [productid]);

  // Save the reviews to local storage when they are updated
  const handleAddReview = (newReview: any) => {
    // Update the reviews state
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    // Save the updated reviews to local storage
    localStorage.setItem(`reviews-${productid}`, JSON.stringify(updatedReviews));
  };

  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const isAlreadyInCart = existingCart.find((item: any) => item._id === product._id);

    if (!isAlreadyInCart) {
      existingCart.push(product);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCart(existingCart);
    }

    setCartVisible(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div className="bg-[#FFF3ED] py-2 mt-[100px]">
  <div className="container ml-[100px] mx-auto gap-[15px] flex items-center">
    <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Home</Link>
    <Image
      src="/arrow.png"
      alt="logo"
      width={30}
      height={30}
      className="leading-[41.45px] "
    />
    <span className="mx-2 text-gray-400"></span>
    <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">Shop</Link>
    <Image
      src="/arrow.png"
      alt="logo"
      width={30}
      height={30}
      className="leading-[41.45px] "
    />
    <span className="mx-2 text-gray-400"></span>
    <span className="text-gray-700 text-sm">{product.title}</span>
  </div>

  <div className="relative flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg p-6">
    {/* Product Image */}
    {product.productImage && (
      <div className="md:w-1/2 w-full flex justify-center">
        <Image
          src={urlFor(product.productImage).url()}
          alt={`Image of ${product.title}`}
          width={400}
          height={400}
          className="rounded-lg object-cover border border-gray-300"
        />
      </div>
    )}

    {/* Product Details */}
    <div className="md:w-1/2 w-full md:pl-8 mt-6 md:mt-0">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h1>
      <p className="text-lg font-semibold text-gray-700 mb-2">
        <strong>Price:</strong> ${product.price}
      </p>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex items-center mt-4">
        <div className="flex text-yellow-500">
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
        </div>
        <span className="ml-2 text-sm text-gray-500">6 Customer Reviews</span>
      </div>

      <div className="flex items-center space-x-4 mt-6">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-sm"
          >
            -
          </button>
          <span className="px-4 py-1 text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-sm"
          >
            +
          </button>
        </div>
        <button onClick={() => handleAddToCart(product)} className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          Add To Cart
        </button>
      </div>

      <div className="mt-8 border-t pt-4 text-sm text-gray-600 space-y-2">
        <p>
          <span className="font-medium">Category:</span> Sofas
        </p>
        <p>
          <span className="font-medium">Tags:</span> {product.tags}
        </p>
      </div>
    </div>
  </div>

  {/* Centered Description Section */}
  <section className="bg-white w-3/4 mx-auto p-8 shadow-lg rounded-lg mt-10">
  <div className="flex justify-center space-x-10 mt-0 border-b border-gray-300 pb-4">
    <button className="font-semibold text-black border-b-2 border-black pb-2">
      <Link href="#dis">Description</Link>
    </button>
    <button className="text-gray-500 hover:text-black">  
      <Link href="#info">Additional Information</Link>
    </button>
    <button className="text-gray-500 hover:text-black">Reviews [5]</button>
  </div>

  {/* Description Content */}
  <div id="dis" className="mt-6 text-gray-600 text-sm text-left">
    <p className="mb-6">{product.description}</p>
    
    <div className="flex justify-between gap-6 mt-6">
      <div className="w-1/2 bg-[#FF0F5] p-2 rounded-lg shadow-md">
        <Image
          src="/sofa3.png"
          alt="Sofa Image 1"
          width={600}
          height={600}
          className="rounded-lg shadow-md object-cover"
        />
      </div>
      <div className="w-1/2 bg-[#FF0F5] p-2 rounded-lg shadow-md">
        <Image
          src="/sofa3.png"
          alt="Sofa Image 2"
          width={600}
          height={600}
          className="rounded-lg shadow-md object-cover"
        />
      </div>
    </div>
  </div>

  {/* Additional Information Content */}
  <div id="info" className="mt-6 text-gray-600 text-sm text-left">
    {/* Add additional information here */}
    <p>This section can be used for additional details about the product, such as size, material, color options, etc.</p>
  </div>

  {/* Product Reviews Component */}
  <div id="reviews" className="mt-8">
    <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
    <ProductReviews reviews={reviews} onAddReview={handleAddReview} />
  </div>
</section>


  {/* Cart Sidebar */}
  {isCartVisible && (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl border-l border-gray-200 p-6 z-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <ul className="space-y-6">
          {cart.map((item:any) => (
            <li
              key={item._id}
              className="flex items-center space-x-6 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              {item.productImage && (
                <Image
                  src={urlFor(item.productImage).url()}
                  alt={`Image of ${item.title}`}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover border border-gray-300"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-lg text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600 mt-1">${item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 mt-4">Your cart is empty.</p>
      )}

      <div className="mt-8">
        <button
          onClick={() => (window.location.href = "/cart")}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          Go to Cart
        </button>
        <button
          onClick={() => setCartVisible(false)}
          className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
        >
          Close Cart
        </button>
      </div>
    </div>
  )}
</div>

  );
}

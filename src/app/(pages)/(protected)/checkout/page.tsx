"use client";
import { useEffect, useState } from "react";
import Checkout from "@/action/Checkout";
import { useCart } from "../../../(context)/CartContext";
import Images from "../../component/images";
import Features from "../../component/features";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export default function Page() {
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    country: "",
    weight: "",
    addressTo: "",
    zipCode: "",
    additionalInformation: "",
  });
  const getTrackingNumber = async () => {
    try {
      const query = `*[_type == "customer"] | order(_createdAt desc)[0].trackingNumber`;
      const result = await client.fetch(query);
      if (result) {
        setTrackingNumber(result); // Store tracking number in state
      } else {
        console.error("No tracking number found.");
      }
    } catch (error) {
      console.error("Error fetching tracking number:", error);
    }
  };

  const { cart } = useCart();

  useEffect(() => {
    getTrackingNumber(); // Fetch tracking number when component mounts
  }, []);
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomerInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      console.error("Cart is empty. Cannot proceed to checkout.");
      return;
    }

    try {
      const success = await Checkout(cart, customerInfo);
      if (success) {
        console.log("Checkout successful!");
        alert("Successfully submitted");
        setIsModalOpen(true); // Open modal on successful checkout
      } else {
        console.error("Checkout failed.");
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data being submitted:", customerInfo);

    const res = await fetch("/api/shipping", {
      method: "POST",
      body: JSON.stringify(customerInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Received data:", data);
      setTrackingNumber(data.trackingNumber);
    } else {
      console.log("Request failed with status:", res.status);
    }
  };

  return (
    <>
      <section>
        <Images />
      </section>

      <section>
        <div className="flex flex-row">
          <div className="w-[608px] h-[1714px] mt-5 ml-[100px] gap-0 border-t border-transparent">
            <h1 className="text-2xl font-bold mb-6">Billing details</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* First Name and Last Name */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block font-medium mb-1"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="name" // Matches the state property
                    value={customerInfo.name}
                    onChange={handleCustomerInfo}
                    placeholder="Enter your first name"
                    className="w-[211px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="block font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleCustomerInfo}
                    placeholder="Enter your last name"
                    className="w-[211px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="company" className="block font-medium mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="companyName"
                  value={customerInfo.companyName}
                  onChange={handleCustomerInfo}
                  placeholder="Enter your company name"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Country / Region */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="country" className="block font-medium mb-1">
                  Country / Region
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={customerInfo.country}
                  onChange={handleCustomerInfo}
                  placeholder="Enter your country name"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Street Address */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="street" className="block font-medium mb-1">
                  Street Address
                </label>
                <textarea
                  id="street"
                  name="address"
                  rows={3}
                  value={customerInfo.address}
                  onChange={handleCustomerInfo}
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Town / City */}
              <div>
                <label htmlFor="city" className="block font-medium mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={customerInfo.weight}
                  onChange={handleCustomerInfo}
                  placeholder="Enter your weight of package"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Province */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="province" className="block font-medium mb-1">
                  addressTo
                </label>
                <input
                  type="text"
                  id="addressTo"
                  name="addressTo"
                  value={customerInfo.addressTo}
                  onChange={handleCustomerInfo}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your province"
                />
              </div>

              {/* ZIP Code */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="zip" className="block font-medium mb-1">
                  ZIP code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={customerInfo.zipCode}
                  onChange={handleCustomerInfo}
                  placeholder="Enter your zip/postal code"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="phone" className="block font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleCustomerInfo}
                  placeholder="Enter your phone number"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Address */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="email" className="block font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleCustomerInfo}
                  placeholder="Enter your email"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Additional Information */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="additional" className="block font-medium mb-1">
                  Additional Information
                </label>
                <textarea
                  id="additional"
                  name="additionalInformation"
                  rows={5}
                  value={customerInfo.additionalInformation}
                  onChange={handleCustomerInfo}
                  placeholder="Enter any additional information"
                  className="w-[453px] h-[75px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </form>
            <div className="text-center">
              <button
                type="button"
                onClick={handleCheckout}
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-[608px] h-[789px] mt-5 ml-[200px]">
            <div className="bg-white shadow-lg p-6 w-96 rounded-md">
              <h2 className="text-lg font-semibold mb-4">Product</h2>
              <div className="flex justify-between border-b pb-4 mb-4">
                <span>Asgaard sofa &times; 1</span>
                <span className="font-medium">Rs. 250,000.00</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>Rs. 250,000.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-yellow-500">Rs. 250,000.00</span>
              </div>

              {/* Payment Methods */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-2">Payment Methods</h3>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id="payment-direct"
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Direct Bank Transfer</span>
                  </label>
                  <p className="text-gray-600 text-xs mt-1">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      id="payment-cash"
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Cash On Delivery</span>
                  </label>
                </div>
              </div>

              <p className="text-gray-600 text-xs mb-6">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <Link href="#" className="text-blue-500 underline">
                  privacy policy
                </Link>
                .
              </p>

              <button
                onClick={handleSubmit}
                className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600"
              >
                Place order
              </button>
            </div>
          </div>
        </div>

        {/* Modal Dialog */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            {/* Balloons Decoration */}
            <div className="absolute top-[-40px] left-[-40px] w-12 h-12 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="absolute top-[-30px] left-[90px] w-12 h-12 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
            <div className="absolute top-[-20px] left-[150px] w-12 h-12 bg-pink-500 rounded-full animate-bounce delay-400"></div>
            
            {/* Main Content */}
            <h3 className="text-3xl font-semibold text-green-500 text-center mb-4">
              Order Placed Successfully! 🎉
            </h3>
            <p className="text-lg text-center mb-4">
              Your tracking number is: <span className="font-bold">{trackingNumber}</span>
            </p>
            
            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
              <button className="bg-green-600 text-white font-medium px-6 py-2 rounded-md hover:bg-green-700">
                <Link href={"/track"}>Track Your Order</Link>
              </button>
            </div>
          </div>
        </div>
        
        )}

        <Features />
      </section>
    </>
  );
}

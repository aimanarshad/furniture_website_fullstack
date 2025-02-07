/* eslint-disable @typescript-eslint/no-explicit-any */

import { client } from "@/sanity/lib/client";
import { Customer } from "@/app/type/customer";
import { Product } from "@/app/type/product";

import { v4 as uuidv4 } from "uuid";

const generateTrackingNumber = () => {
  // Generate a unique tracking number
  return `TRACK-${uuidv4().slice(0, 8).toUpperCase()}`;
};

const CreateCustomerInSanity = async (customerInfo: Customer) => {
  try {
    const trackingNumber = generateTrackingNumber(); // Generate the tracking number

    const customerObject = {
      _type: "customer",
      name: customerInfo.name,
      lastName: customerInfo.lastName, // Fixed typo
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      companyName: customerInfo.companyName,
      country: customerInfo.country,
      weight: customerInfo.weight,
      addressTo: customerInfo.addressTo,
      zipCode: customerInfo.zipCode,
      additionalInformation: customerInfo.additionalInformation,
      trackingNumber, // Save the tracking number in the customer object
    };

    const response = await client.create(customerObject); // Save in Sanity
    console.log("Customer created in Sanity with tracking number:", trackingNumber);

    // Return the full customer object along with the tracking number
    return { ...response, trackingNumber }; 
  } catch (error) {
    console.error("Error creating customer in Sanity:", error);
    throw new Error("Failed to create customer. Please try again.");
  }
};

const CreateOrderInSanity = async (cartData: Product[], customer_id: string) => {
  try {
    const orderObject = {
      _type: "order",
      customer: {
        _type: "reference",
        _ref: customer_id,
      },
      items: cartData.map((items: Product) => ({
        _type: "items",
        id: items._id,
        product_name: items.title,
        product_price: items.price,
        quantity: 1,
      })),
      order_date: new Date().toISOString(),
    };

    const response = await client.create(orderObject); // Save the order in Sanity
    console.log("Order created in Sanity:", response);
    return response;
  } catch (error) {
    console.error("Error creating order in Sanity:", error);
    throw new Error("Failed to create order. Please try again.");
  }
};

export default async function Checkout(cartData: Product[], customerData: Customer) {
  try {
    // Step 1: Create the customer in Sanity and retrieve their data
    const customer = await CreateCustomerInSanity(customerData);

    if (!customer || !customer._id) {
      throw new Error("Customer creation failed. Missing ID.");
    }

    // Step 2: Create an order for the customer
    const order = await CreateOrderInSanity(cartData, customer._id);

    console.log("Checkout completed successfully:", { order, trackingNumber: customer.trackingNumber });

    return {
      success: true,
      order,
      trackingNumber: customer.trackingNumber, // Include tracking number in the response
    };
  } catch (error: any) {
    console.error("Error during checkout process:", error);
    return { success: false, error: error.message };
  }
}

// app/api/track/route.ts
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const trackingNumber = url.searchParams.get("trackingNumber");

  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Tracking number is required." },
      { status: 400 }
    );
  }

  try {
    // Query Sanity for the tracking number
    const query = `*[_type == "customer" && trackingNumber == $trackingNumber][0]`;
    const customer = await client.fetch(query, { trackingNumber });

    if (!customer) {
      return NextResponse.json(
        { error: "No customer found with this tracking number." },
        { status: 404 }
      );
    }

    // Query the order related to the customer
    const orderQuery = `*[_type == "order" && customer._ref == $customerId][0]`;
    const order = await client.fetch(orderQuery, { customerId: customer._id });

    // Return customer and order data in the response
    return NextResponse.json(
      {
        customer,
        order, // Include order data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

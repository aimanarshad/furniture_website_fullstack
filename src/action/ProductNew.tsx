/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/type/product"; // Assuming this type exists in your project

const CreateProductInSanity = async (productInfo: Product) => {
  try {
    const productObject = {
      _type: "product", // Product type (from your schema)
      id:productInfo.id,
      title: productInfo.title,
      description: productInfo.description,
      price: productInfo.price,
      productImage: productInfo.productImage, // Assuming this is the asset _id of the image in Sanity
      tags: productInfo.tags,
      discountPercentage: productInfo.dicountPercentage,
      isNew: productInfo.isNew,
    };

    const response = await client.create(productObject); // Create the product in Sanity
    console.log("Product created in Sanity:", response);

    return response;
  } catch (error) {
    console.error("Error creating product in Sanity:", error);
    throw new Error("Failed to create product. Please try again.");
  }
};

// Example function to handle the full product creation process
export default async function ProductNew(productData: Product) {
  try {
    const product = await CreateProductInSanity(productData);

    console.log("Product creation completed successfully:", product);

    return {
      success: true,
      product,
    };
  } catch (error: any) {
    console.error("Error during product creation:", error);
    return { success: false, error: error.message };
  }
}

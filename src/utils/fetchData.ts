// utils/fetchData.ts
import { client } from "@/sanity/lib/client";

export const getProducts = async () => {
  const productData = await client.fetch(`
    *[_type == "product"][0..22] {
      id,
      title,
      price,
      tags,
      discountPercentage,
      description,
      isNew,
      productImage
    }
  `);
  return productData;
};

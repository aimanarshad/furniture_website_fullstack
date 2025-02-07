// pages/api/createProduct.js
import { client } from '@/sanity/lib/client';

async function createProduct(productData) {
  try {
    const newProduct = await client.create({
      _type: 'product',
      ...productData,
    });
    console.log('Product created:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error; // Re-throw the error to be caught in the handler
  }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const product = await createProduct(req.body);
            res.status(200).json({ product }); // Send JSON response
        } catch (error) {
            console.error("API Route Error:", error);
            res.status(500).json({ error: error.message || 'Failed to create product' }); // Send JSON error response
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

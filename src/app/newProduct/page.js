"use client";
import { useState } from 'react';
import { client } from '@/sanity/lib/client';

const NewProduct = () => {  // Capitalize component name
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsUploading(true);

    const imageData = e.target.productImage.files[0];

    if (!imageData) {
      setError("Please select an image");
      setIsUploading(false);
      return;
    }

    let uploadedImage = null;

    try {
      uploadedImage = await client.assets.upload('image', imageData);
    } catch (imageError) {
      console.error("Error uploading image:", imageError);
      setError("Error uploading image. Please try again.");
      setIsUploading(false);
      return;
    } finally {
      setIsUploading(false);
    }

    const discountPercentageInput = e.target.discountPercentage; // Get the input element

    const productData = {
      id: parseInt(e.target.id.value),
      title: e.target.title.value,
      description: e.target.description.value,
      productImage: {
        _type: 'image',
        asset: {
          _ref: uploadedImage._id,
          _type: 'reference',
        },
      },
      price: parseFloat(e.target.price.value),
      tags: e.target.tags.value.split(',').map((tag) => tag.trim()),
      discountPercentage: discountPercentageInput && discountPercentageInput.value ? parseFloat(discountPercentageInput.value) : 0, // Corrected typo here
      isNew: e.target.isNew.checked,
    };

    try {
      const response = await fetch('/api/createProduct', { // Make sure the API route is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        if (!response.ok) {
          const contentType = response.headers.get('content-type'); // Check content type
  
          if (contentType && contentType.includes('application/json')) { // Check if JSON
              const data = await response.json(); // If JSON, parse as JSON
              throw new Error(data.error || 'Failed to create product'); // Throw error
          } else {
              const text = await response.text(); // If not JSON, get text
              throw new Error(text || 'Failed to create product'); // Throw error
          }
      }
      }

      const createdProduct = await response.json();
      console.log("Product created:", createdProduct);
      setSuccess("Product created successfully!");
      e.target.reset(); // Clear the form
    } catch (error) {
      console.error("Component Error:", error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
<h2 className="text-2xl font-semibold text-gray-800 text-center">Create Product</h2>

<div className="space-y-2">
  <label htmlFor="id" className="block text-gray-700 font-medium">ID:</label>
  <input 
    type="number" 
    id="id" 
    name="id" 
    required 
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
  />
</div>

<div className="space-y-2">
  <label htmlFor="title" className="block text-gray-700 font-medium">Title:</label>
  <input 
    type="text" 
    id="title" 
    name="title" 
    required 
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
  />
</div>

<div className="space-y-2">
  <label htmlFor="description" className="block text-gray-700 font-medium">Description:</label>
  <textarea 
    id="description" 
    name="description" 
    required 
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
  />
</div>

<div className="space-y-2">
  <label htmlFor="productImage" className="block text-gray-700 font-medium">Product Image:</label>
  <input 
    type="file" 
    id="productImage" 
    name="productImage" 
    required 
    className="w-full p-2 border border-gray-300 rounded-md"
  />
  {isUploading && <p className="text-blue-600 text-sm">Uploading Image...</p>}
</div>

<div className="space-y-2">
  <label htmlFor="price" className="block text-gray-700 font-medium">Price:</label>
  <input 
    type="number" 
    id="price" 
    name="price" 
    step="0.01" 
    required 
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
  />
</div>

<div className="space-y-2">
  <label htmlFor="tags" className="block text-gray-700 font-medium">Tags (comma-separated):</label>
  <input 
    type="text" 
    id="tags" 
    name="tags" 
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
  />
</div>
       <div className="space-y-2">
            <label htmlFor="discountPercentage" className="block text-gray-700 font-medium">Discount Percentage:</label>
            <input 
                type="number" 
                id="discountPercentage" 
                name="discountPercentage" // Correct name is here
                step="0.01" 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <div className="flex items-center space-x-2">
    <input 
      type="checkbox" 
      id="isNew" 
      name="isNew" 
      className="w-5 h-5 text-blue-500 focus:ring-2 focus:ring-blue-400"
    />
    <label htmlFor="isNew" className="text-gray-700 font-medium">New Badge</label>
  </div>

  <button 
    type="submit" 
    disabled={isUploading} 
    className={`w-full py-2 rounded-md text-white font-medium transition duration-300 
      ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
    `}
  >
    Create Product
  </button>

  {error && <p className="text-red-500 text-sm">{error}</p>}
  {success && <p className="text-green-500 text-sm">{success}</p>}    </form>
  );
};

export default NewProduct; // Correct export name
import { useState } from "react";

// Define the types for reviews
interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  onAddReview: (newReview: Review) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, onAddReview }) => {
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(1);
  const [newName, setNewName] = useState<string>("");

  // Handle review submission
  const handleReviewSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input fields
    if (!newName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!newReview.trim()) {
      alert("Please enter your review.");
      return;
    }

    const review: Review = {
      id: (reviews.length + 1).toString(),
      user: newName, // Include the user's name
      rating: newRating,
      comment: newReview,
    };
    onAddReview(review);

    // Reset form fields
    setNewReview("");
    setNewRating(1);
    setNewName("");
  };

  return (
    <div className="reviews mt-12">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Customer Reviews</h2>

  {/* Reviews List */}
  <div className="reviews-list mb-6 space-y-6">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div
          key={review.id}
          className="review p-6 bg-white rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <p className="font-semibold text-xl text-gray-800">{review.user}</p>
          <p className="text-yellow-500 mt-1">
            {"★".repeat(review.rating)}{" "}
            {"☆".repeat(5 - review.rating)} {/* Display the rating */}
          </p>
          <p className="text-gray-700 mt-4">{review.comment}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-600 text-center">No reviews yet. Be the first to review this product!</p>
    )}
  </div>

  {/* Add Review Form */}
  <form
    onSubmit={handleReviewSubmit}
    className="review-form bg-gray-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto space-y-6"
  >
    <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Leave a Review</h3>

    {/* Name Input */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 mb-2 text-lg">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter your name"
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 transition duration-300"
      />
    </div>

    {/* Rating Input */}
    <div className="mb-4">
      <label htmlFor="rating" className="block text-gray-700 mb-2 text-lg">
        Rating
      </label>
      <select
        id="rating"
        value={newRating}
        onChange={(e) => setNewRating(Number(e.target.value))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 transition duration-300"
      >
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
    </div>

    {/* Review Input */}
    <div className="mb-4">
      <label htmlFor="review" className="block text-gray-700 mb-2 text-lg">
        Review
      </label>
      <textarea
        id="review"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        rows={4}
        placeholder="Write your review here..."
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 transition duration-300"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-600 text-white py-3 text-lg rounded-lg hover:bg-green-700 transition duration-300"
    >
      Submit Review
    </button>
  </form>
</div>
  )
}
export default ProductReviews;

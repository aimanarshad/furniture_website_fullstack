"use client"
import React, { useState } from "react";

const FeedbackDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("feedback submitted")
    // Here you can handle the feedback submission, e.g., send it to a server
    console.log("Feedback Submitted:", feedback);
    setFeedback(""); // Reset feedback
    onClose(); // Close the dialog after submission
  };

  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">We value your feedback!</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded-lg mb-4"
            rows={5}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
          ></textarea>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackDialog;

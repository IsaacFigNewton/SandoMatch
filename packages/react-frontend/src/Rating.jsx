import React from "react";

const Rating = ({ sandwichId, rating, handleRatingChange }) => {
  return (
    <div className="rating">
      {[5, 4, 3, 2, 1].map((star) => (
        <label key={star}>
          <input
            type="radio"
            name={`rating-${sandwichId}`}
            value={star}
            checked={rating === star}
            onChange={() => handleRatingChange(sandwichId, star)}
          />
          <span className="star">&#9733;</span>
        </label>
      ))}
      <p>Your rating: {rating || "No rating yet"}</p>
    </div>
  );
};

export default Rating;

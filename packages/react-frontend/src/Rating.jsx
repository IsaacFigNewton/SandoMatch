// import React from "react";

import PropTypes from "prop-types";

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
            onChange={() =>
              handleRatingChange(sandwichId, star)
            }
          />
          <span className="star">&#9733;</span>
        </label>
      ))}
      <p>Your rating: {rating || "No rating yet"}</p>
    </div>
  );
};

// Validate Rating function props
Rating.propTypes = {
  sandwichId: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  handleRatingChange: PropTypes.func.isRequired
};

export default Rating;

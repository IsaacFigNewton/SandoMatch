// import React from "react";

import PropTypes from "prop-types";

const Rating = ({ rating = 0 }) => {
  return (
    <div className="rating static">
      {[5, 4, 3, 2, 1].map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? "filled" : ""}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

// Validate Rating function props
Rating.propTypes = {
  rating: PropTypes.number, // Optional but default is set to 0
};

export default Rating;

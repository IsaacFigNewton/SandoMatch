import React from "react";
import PropTypes from "prop-types";

const Rating = ({ rating = 0 }) => {
  return (
    <div className="rating static">
      {[1, 2, 3, 4, 5].map((star) => (
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

Rating.propTypes = {
  rating: PropTypes.number.isRequired, 
};

export default Rating;
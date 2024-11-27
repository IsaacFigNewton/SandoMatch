// import React from "react";
import PropTypes from "prop-types";
import Rating from "./Rating";

const SandwichList = ({
  sandwiches,
  ratings,
  handleRatingChange
}) => {
  return (
    <div className="sandwich-list">
      {sandwiches.map((sandwich) => (
        <div key={sandwich.id_} className="sandwich-card">
          <h3>{sandwich.name}</h3>
          <ul>
            {Object.values(sandwich.ingredients || {})
              .flatMap((category) =>
                Object.values(category).flat()
              )
              .map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
          <p>
            {sandwich.cuisine
              ? sandwich.cuisine
              : "Cuisine not specified"}
          </p>
          <Rating
            sandwichId={sandwich.id_}
            rating={ratings[sandwich.id_]}
            handleRatingChange={handleRatingChange}
          />
        </div>
      ))}
    </div>
  );
};

// Validate Sandwich card props
SandwichList.propTypes = {
  sandwiches: PropTypes.arrayOf(PropTypes.object).isRequired,
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRatingChange: PropTypes.func.isRequired
};

export default SandwichList;

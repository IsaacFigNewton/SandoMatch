import React from "react";
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

export default SandwichList;

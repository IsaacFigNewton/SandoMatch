// import React from "react";
import PropTypes from "prop-types";
import Rating from "./Rating";

import veganImg from "./assets/vegan2.png";
import vegetarianImg from "./assets/vegetarian.png";
import glutenFreeImg from "./assets/gluten-free.png";

const SandwichList = ({
  sandwiches,
  bookmarkSandwich,
  trySandwich,
  favoriteSandwich
}) => {
  const renderDietaryTags = (tags) => {
    const tagIcons = {
      vegan: veganImg,
      vegetarian: vegetarianImg,
      "gluten-free": glutenFreeImg
    };

    return (
      <div className="dietary-tags">
        {tags.includes("vegan") && (
          <img
            src={tagIcons.vegan}
            alt="Vegan"
            className="dietary-tag-icon"
          />
        )}
        {tags.includes("vegetarian") && (
          <img
            src={tagIcons.vegetarian}
            alt="Vegetarian"
            className="dietary-tag-icon"
          />
        )}
        {tags.includes("gluten-free") && (
          <img
            src={tagIcons["gluten-free"]}
            alt="Gluten-Free"
            className="dietary-tag-icon"
          />
        )}
      </div>
    );
  };

  const renderCostRange = (cost) => {
    if (cost < 5) return "$";
    if (cost < 10) return "$$";
    return "$$$";
  };

  const renderIngredients = (ingredients) => {
    const allIngredients = Object.values(
      ingredients || {}
    ).flatMap((category) => Object.values(category).flat());
    const displayedIngredients = allIngredients.slice(0, 3);
    return (
      <p>
        <strong>Ingredients:</strong>{" "}
        {displayedIngredients.join(", ")}{" "}
        {allIngredients.length > 3 && "..."}
      </p>
    );
  };
  return (
    <div className="sandwich-list">
      {sandwiches.map((sandwich) => (
        <div key={sandwich.id_} className="sandwich-card">
          {/* header for sandwich cards holding name and buttons */}
          <div className="card-header">
            <h3>{sandwich.name}</h3>
            <div className="sando-buttons">
              <button
                className="favorite-button"
                aria-label="Favorite"
                onClick={() => {
                  favoriteSandwich(sandwich._id);
                }}
              >
                {String.fromCodePoint(0x2764)}
              </button>
              <button
                className="bookmark-button"
                aria-label="Bookmark"
                onClick={() => {
                  bookmarkSandwich(sandwich._id);
                }}
              >
                {String.fromCodePoint(0x1f516)}
              </button>
              <button
                className="tried-button"
                aria-label="Tried"
                onClick={() => {
                  trySandwich(sandwich._id);
                }}
              >
                {String.fromCodePoint(0x2705)}
              </button>
            </div>
          </div>
          {/* end header */}
          {renderIngredients(sandwich.ingredients)}

          <p>
            <strong>Cost:</strong>{" "}
            {renderCostRange(sandwich.costs)}
          </p>
          {renderDietaryTags(sandwich.dietary_tags || [])}
          <Rating rating={sandwich.rating || 0} />
        </div>
      ))}
    </div>
  );
};

SandwichList.propTypes = {
  sandwiches: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      name: PropTypes.string.isRequired,
      ingredients: PropTypes.object.isRequired,
      dietary_tags: PropTypes.arrayOf(PropTypes.string),
      costs: PropTypes.arrayOf(PropTypes.number).isRequired,
      rating: PropTypes.number // Optional defaults to 0 if missing
    })
  ).isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  bookmarkSandwich: PropTypes.func.isRequired,
  trySandwich: PropTypes.func.isRequired,
  favoriteSandwich: PropTypes.func.isRequired
};

export default SandwichList;

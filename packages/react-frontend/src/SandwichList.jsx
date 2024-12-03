// import React from "react";
import PropTypes from "prop-types";
import Rating from "./Rating";

import veganImg from "./assets/vegan.png";
import vegetarianImg from "./assets/vegetarian.png";
import glutenFreeImg from "./assets/gluten-free.png";

const SandwichList = ({ sandwiches, ratings }) => {
  // Updated renderDietaryTags to display PNG icons
  const renderDietaryTags = (tags) => {
    const tagIcons = {
      vegan: veganImg,
      vegetarian: vegetarianImg,
      "gluten-free": glutenFreeImg,
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
    const allIngredients = Object.values(ingredients || {})
      .flatMap((category) => Object.values(category).flat());
    const displayedIngredients = allIngredients.slice(0, 3);
    return (
      <p>
        Ingredients: {displayedIngredients.join(", ")}{" "}
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
              >
                {String.fromCodePoint(0x2764)}
              </button>
              <button
                className="bookmark-button"
                aria-label="Bookmark"
              >
                {String.fromCodePoint(0x1f516)}
              </button>
              <button
                className="tried-button"
                aria-label="Tried"
              >
                {String.fromCodePoint(0x2705)}
              </button>
            </div>
          </div>

          {/* end header */}

          {/* Dietary Tags */}
          {renderDietaryTags(sandwich.dietary_tags || [])}

          {/* Cost Range */}
          <p>Cost: {renderCostRange(sandwich.costs[0])}</p>

          {/* Ingredients */}
          {renderIngredients(sandwich.ingredients)}

          {/* Cuisine */}
          <p>{sandwich.cuisine ? sandwich.cuisine : "Cuisine not specified"}</p>

          {/* Static Rating */}
          <Rating rating={ratings[sandwich._id]} />
        </div>
      ))}
    </div>
  );
};

// Validate Sandwich card props
SandwichList.propTypes = {
  sandwiches: PropTypes.arrayOf(PropTypes.object).isRequired,
  ratings: PropTypes.object.isRequired, // Changed to object for better mapping by sandwich ID
};

export default SandwichList;

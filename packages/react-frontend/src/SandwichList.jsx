// import React from "react";
import PropTypes from "prop-types";
import Rating from "./Rating";

const SandwichList = ({
  sandwiches,
  ratings,
  handleRatingChange,
  bookmarkSandwich,
  trySandwich,
  favoriteSandwich
}) => {
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

SandwichList.propTypes = {
  sandwiches: PropTypes.arrayOf(PropTypes.object).isRequired,
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  bookmarkSandwich: PropTypes.func.isRequired,
  trySandwich: PropTypes.func.isRequired,
  favoriteSandwich: PropTypes.func.isRequired
};

export default SandwichList;

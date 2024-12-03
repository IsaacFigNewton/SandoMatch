import React from "react";
import Rating from "./Rating";
import PropTypes from "prop-types";

const SandwichCard = ({ sandwich }) => {
  // Utility to get dietary tag icons
  const getDietaryIcons = (tags) => {
    const icons = [];
    if (tags.includes("vegan")) icons.push("🌿"); // Leaf for vegan
    if (tags.includes("vegetarian")) icons.push("❓"); // Question mark for vegetarian
    if (tags.includes("gluten-free")) icons.push("🚫🍞"); // Crossed-out bread for gluten-free
    return icons;
  };

  // Utility to get cost range icon
  const getCostRangeIcon = (cost) => {
    if (cost < 5) return "$";
    if (cost >= 5 && cost < 10) return "$$";
    return "$$$";
  };

  // Extract dietary icons and cost range
  const dietaryIcons = getDietaryIcons(sandwich.dietary_tags);
  const costRangeIcon = getCostRangeIcon(sandwich.costs[0]);

  // Prepare ingredients list
  const ingredientCategories = Object.values(sandwich.ingredients)
    .flatMap((items) => Object.values(items).flat());
  const displayedIngredients = ingredientCategories.slice(0, 3);
  const hasMoreIngredients = ingredientCategories.length > 3;

  return (
    <div className="sandwich-card">
      <h2>{sandwich.name}</h2>
      <div className="dietary-icons">
        {dietaryIcons.map((icon, index) => (
          <span key={index} className="dietary-icon">
            {icon}
          </span>
        ))}
      </div>
      <div className="cost-range">{costRangeIcon}</div>
      <p><strong>Ingredients:</strong> {displayedIngredients.join(", ")}{hasMoreIngredients ? "..." : ""}</p>
      <Rating rating={sandwich.rating} />
    </div>
  );
};

SandwichCard.propTypes = {
  sandwich: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dietary_tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    costs: PropTypes.arrayOf(PropTypes.number).isRequired,
    ingredients: PropTypes.object.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default SandwichCard;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FilterPage = ({ filters, setFilters, applyFilters, clearFilters }) => {
  const ingredients = {
    breads: ["White", "Sourdough", "Tortilla Wrap"],
    cheeses: ["Mozzarella", "Cheddar", "Provolone"],
    vegetables: ["Tomato", "Onion", "Lettuce"],
    proteins: ["Salami", "Ham", "Turkey"],
    condiments: ["Mustard", "Mayonnaise", "Oil"]
  };

  const parseIngredients = (ingredientsString) =>
    ingredientsString ? ingredientsString.split(",") : [];

  const handleCheckboxChange = (value, isChecked) => {
    const currentIngredients = parseIngredients(filters.ingredients);

    const updatedIngredients = isChecked
      ? [...currentIngredients, value] 
      : currentIngredients.filter((item) => item !== value); 

    setFilters((prev) => ({
      ...prev,
      ingredients: updatedIngredients.join(",")
    }));
  };

  return (
    <div className="filter-page">
      <h2>Preferences</h2>
      <table className="preference-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Ingredient</th>
            <th>Include</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ingredients).map(([category, items]) =>
            items.map((item, index) => (
              <tr key={`${category}-${item}`}>
                {/* Show the category name only for the first row of each category */}
                <td>{index === 0 ? category : ""}</td>
                <td>{item}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(
                        item.toLowerCase(),
                        e.target.checked
                      )
                    }
                    checked={parseIngredients(filters.ingredients).includes(
                      item.toLowerCase()
                    )}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="filter-actions">
        <Link
          to="/"
          className="apply-button"
          onClick={() => applyFilters(filters)}
        >
          Apply Filters
        </Link>
        <button onClick={clearFilters} className="clear-filters-button">
          Clear
        </button>
      </div>
    </div>
  );
};

FilterPage.propTypes = {
  filters: PropTypes.shape({
    dietary_tags: PropTypes.array.isRequired,
    ingredients: PropTypes.string.isRequired, // Ingredients stored as a string
    maxCost: PropTypes.number.isRequired,
    minCalories: PropTypes.number.isRequired,
    maxCalories: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired
};

export default FilterPage;

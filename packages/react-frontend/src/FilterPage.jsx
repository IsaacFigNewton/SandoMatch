// import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FilterPage = ({ filters, setFilters, applyFilters }) => {
  const ingredients = {
    breads: ["White", "Sourdough", "Tortilla Wrap"],
    cheeses: ["Mozzarella", "Cheddar", "Provolone"],
    vegetables: ["Tomato", "Onion", "Lettuce"],
    proteins: ["Salami", "Ham", "Turkey"],
    condiments: ["Mustard", "Mayonnaise", "Oil"]
  };

  const handleCheckboxChange = (action, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      updated[action] = updated[action].includes(value)
        ? updated[action].filter((item) => item !== value)
        : [...updated[action], value];
      return updated;
    });
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
            <th>Exclude</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ingredients).map(
            ([category, items]) =>
              items.map((item, index) => (
                <tr key={item}>
                  {/* Show the category name only for the first row of each category */}
                  <td>{index === 0 ? category : ""}</td>
                  <td>{item}</td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange("include", item)
                      }
                      checked={filters.ingredients.include.category
                        // TODO: Fix bug here
                        .includes(item)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange("exclude", item)
                      }
                      checked={filters.ingredients.exclude.category
                        // TODO: Fix bug here
                        .includes(item)}
                    />
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <Link
        to="/"
        className="apply-button"
        onClick={() => applyFilters(filters)}
      >
        Apply Filters
      </Link>
    </div>
  );
};

// Validate FilterPage props
FilterPage.propTypes = {
  filters: PropTypes.shape({
    dietary_tags: PropTypes.array.isRequired,
    ingredients: PropTypes.shape({
      include: PropTypes.shape({
        breads: PropTypes.array.isRequired,
        meats: PropTypes.array.isRequired,
        cheeses: PropTypes.array.isRequired,
        vegetables: PropTypes.array.isRequired,
        condiments: PropTypes.array.isRequired,
        spices: PropTypes.array.isRequired
      }).isRequired,
      exclude: PropTypes.shape({
        breads: PropTypes.array.isRequired,
        meats: PropTypes.array.isRequired,
        cheeses: PropTypes.array.isRequired,
        vegetables: PropTypes.array.isRequired,
        condiments: PropTypes.array.isRequired,
        spices: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,
    maxCost: PropTypes.number.isRequired,
    minCalories: PropTypes.number.isRequired,
    maxCalories: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired
};

export default FilterPage;

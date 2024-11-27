// import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FilterPage = ({ filters, setFilters, applyFilters }) => {
  const ingredients = {
    Bread: ["White", "Sourdough", "Tortilla Wrap"],
    Cheese: ["Mozzarella", "Cheddar", "Provolone"],
    Vegetables: ["Tomato", "Onion", "Lettuce"],
    Proteins: ["Salami", "Ham", "Turkey"],
    Condiments: ["Mustard", "Mayonnaise", "Oil"]
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
                      checked={filters.include.includes(item)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange("exclude", item)
                      }
                      checked={filters.exclude.includes(item)}
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
    include: PropTypes.array.isRequired,
    exclude: PropTypes.array.isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired
};

export default FilterPage;

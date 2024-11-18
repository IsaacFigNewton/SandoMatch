import React from "react";
import { Link } from "react-router-dom";

const FilterPage = ({ filters, setFilters, applyFilters }) => {
  const ingredients = {
    Bread: ["White", "Artisan", "Lettuce Wrap"],
    Cheese: ["American", "Cheddar", "Provolone"],
    Veggies: ["Tomato", "Onion", "Lettuce"],
    Proteins: ["Pepperoni", "Ham", "Turkey"],
    Condiments: ["Mustard", "Mayonnaise", "Oil"],
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
      <header className="filter-header">
        <Link to="/" className="back-button">
          Back
        </Link>
        <h2>Preferences</h2>
      </header>
      <div className="filter-options">
        {Object.entries(ingredients).map(([category, items]) => (
          <div key={category} className="filter-category">
            <h3>{category}</h3>
            {items.map((item) => (
              <div key={item} className="filter-item">
                <span>{item}</span>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("include", item)}
                  checked={filters.include.includes(item)}
                /> Include
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange("exclude", item)}
                  checked={filters.exclude.includes(item)}
                /> Exclude
              </div>
            ))}
          </div>
        ))}
      </div>
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

export default FilterPage;

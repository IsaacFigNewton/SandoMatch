import React from "react";

const SandwichList = ({ sandwiches }) => {
  return (
    <main className="main-content">
      <h2>Sandwich Menu</h2>
      <div className="sandwich-list">
        {sandwiches.map((sandwich) => (
          <div key={sandwich.id_} className="sandwich-card">
            <h3>Sandwich #{sandwich.id_}</h3>
            <ul>
              {Object.values(sandwich.ingredients || {})
                .flatMap((category) => Object.values(category).flat())
                .map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p>
              {sandwich.cuisine
                ? sandwich.cuisine
                : "Cuisine not specified"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SandwichList;

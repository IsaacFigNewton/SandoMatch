import { useState, useEffect } from "react";
import sandwichData from "../../../sandwich-dataset/generated_sandwiches.json";
import "./App.css";

function App() {
  const [sandwiches] = useState(sandwichData);
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [randomSandwich, setRandomSandwich] = useState(null);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const handleRatingChange = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating,
    }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    setRandomSandwich(null);
  };

  const getRandomSandwich = () => {
    const randomIndex = Math.floor(Math.random() * sandwiches.length);
    setRandomSandwich(sandwiches[randomIndex]);
    setSearchTerm("");
  };

  const filteredSandwiches = searchTerm
    ? sandwiches.filter((sandwich) =>
        sandwich.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm)
        )
      )
    : sandwiches;

  return (
    <div>
      <header className="app-header">
        <h1>SandoMatch</h1>
      </header>
      
      <input
        type="text"
        placeholder="Search for a sandwich..."
        className="search-bar"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="random-button" onClick={getRandomSandwich}>
        Random
      </button>

      <main className="main-content">
        <h2>Sandwich Menu</h2>
        <div className="sandwich-list">
          {randomSandwich ? (
            <div key={randomSandwich.id} className="sandwich-card">
              <h3>Sandwich #{randomSandwich.id}</h3>
              <ul>
                {randomSandwich.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <p>
                {randomSandwich.cuisine ? randomSandwich.cuisine : "Cuisine not specified"}
              </p>
            </div>
          ) : (
            filteredSandwiches.map((sandwich) => (
              <div key={sandwich.id} className="sandwich-card">
                <h3>Sandwich #{sandwich.id}</h3>
                <ul>
                  {sandwich.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p>{sandwich.cuisine ? sandwich.cuisine : "Cuisine not specified"}</p>
                <div className="rating">
                  
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star}>
                      <input
                        type="radio"
                        name={`rating-${sandwich.id}`}
                        value={star}
                        checked={ratings[sandwich.id] === star}
                        onChange={() => handleRatingChange(sandwich.id, star)}
                      />
                      <span className="star">&#9733;</span>
                    </label>
                  ))}
                  <p>Your rating: {ratings[sandwich.id]|| "No rating yet"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default MyApp;

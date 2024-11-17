import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import sandwichData from "./sandwich-dataset/generated_sandwiches.json";
import Login from "./Login";
import "./App.css";

const API_PREFIX = "http://localhost:8000";



function App() {
  const [sandwiches, setSandwiches] = useState(sandwichData);
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [randomSandwich, setRandomSandwich] = useState(null);
  const [error, setError] = useState(null);


  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch("http://localhost:5173/sandwich-dataset/formatted_sandwich_entries  .json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => setSandwiches(data))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

/*
  function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader()
    });

    return promise;
  }
  

  const promise = fetch(`${API_PREFIX}/users`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(person)
  });
  */

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; 
            auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

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
      <Router>
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
                    {randomSandwich.cuisine
                      ? randomSandwich.cuisine
                      : "Cuisine not specified"}
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
                    <p>
                      {sandwich.cuisine
                        ? sandwich.cuisine
                        : "Cuisine not specified"}
                    </p>
                    <div className="rating">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <label key={star}>
                          <input
                            type="radio"
                            name={`rating-${sandwich.id}`}
                            value={star}
                            checked={ratings[sandwich.id] === star}
                            onChange={() =>
                              handleRatingChange(sandwich.id, star)
                            }
                          />
                          <span className="star">&#9733;</span>
                        </label>
                      ))}
                      <p>
                        Your rating: {ratings[sandwich.id] || "No rating yet"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
        <Routes>
          <Route
            path="/login"
            element={<Login handleSubmit={loginUser} />}
          />
          <Route
            path="/signup"
            element={
              <Login handleSubmit={signupUser} buttonLabel="Sign Up" />
            }
          />
        </Routes>
      </Router>
    );
    
}

export default App;

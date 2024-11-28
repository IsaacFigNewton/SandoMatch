import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import sandwichData from "./sandwiches.json";
import FilterPage from "./FilterPage";
import SandwichList from "./SandwichList";
import Login from "./Login";
import Signup from "./Signup";
import UserPage from "./UserPage";
import "./App.css";

const API_PREFIX = "http://localhost:8000";

function App() {
  const [sandwiches, setSandwiches] = useState(sandwichData);
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [randomSandwich, setRandomSandwich] = useState(null);
  const [, setError] = useState(null);

  const INVALID_TOKEN = "INVALID_TOKEN";
  const [, setToken] = useState(INVALID_TOKEN);
  const [, setMessage] = useState("");
  const [filters, setFilters] = useState({
    include: [],
    exclude: []
  });

  // Fetch all sandwiches from the backend
  useEffect(() => {
    fetch(`${API_PREFIX}/sandwiches`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch sandwiches");
        }
        return res.json();
      })
      .then((data) => setSandwiches(data.sandwiches_list))
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  }, []);

  const applyFilters = (filters) => {
    fetch(`${API_PREFIX}/sandwiches/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filters)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch filtered sandwiches"
          );
        }
        return response.json();
      })
      .then((filteredSandwiches) => {
        setSandwiches(filteredSandwiches);
      })
      .catch((error) =>
        console.error("Error applying filters:", error)
      );
  };

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

  // function addAuthHeader(otherHeaders = {}) {
  //   if (token === INVALID_TOKEN) {
  //     return otherHeaders;
  //   } else {
  //     return {
  //       ...otherHeaders,
  //       Authorization: `Bearer ${token}`
  //     };
  //   }
  // }

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
    const savedRatings =
      JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const handleRatingChange = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating
    }));
  };

  const getRandomSandwich = () => {
    fetch(`${API_PREFIX}/sandwiches/random`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch random sandwich");
        }
        return response.json();
      })
      .then((sandwich) => {
        setRandomSandwich(sandwich);
        setSearchTerm("");
      })
      .catch((error) => {
        console.error("Error fetching random sandwich:", error);
        setError("Error fetching random sandwich");
      });
  };

  // const handleSearch = (term) => {
  //   setSearchTerm(term.toLowerCase());
  //   setRandomSandwich(null); // Reset random sandwich
  // };

  const filteredSandwiches = searchTerm
    ? sandwiches.filter((sandwich) =>
        sandwich.ingredients
          ? Object.values(sandwich.ingredients)
              .flatMap((category) =>
                Object.values(category).flat()
              )
              .some((ingredient) =>
                ingredient.toLowerCase().includes(searchTerm)
              )
          : false
      )
    : sandwiches;

  return (
    <Router>
      <div>
        <header className="app-header">
          <Link to="/" className="logo-link">
            <h1 className="app-logo">SandoMatch</h1>
          </Link>

          {/* filtering */}
          <Link to="/filter" className="filter-button">
            Filter
          </Link>

          {/* user buttons */}
          <div className="auth-buttons">
            <Link to="/login">
              <button className="auth-button login">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="auth-button signup">
                Signup
              </button>
            </Link>
          </div>
          <div className="user-button">
            <Link to="/user">
              <button className="user-prof-button">
                <img
                  src="src/assets/user-icon-img.png"
                  className="button-image"
                />
              </button>
            </Link>
          </div>
        </header>

        <Routes>
          {/* sandwich filtering routes */}
          <Route
            path="/"
            element={
              <main className="main-content">
                <input
                  type="text"
                  placeholder="Search for a sandwich..."
                  className="search-bar"
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
                <button
                  className="random-button"
                  onClick={getRandomSandwich}
                >
                  Random
                </button>
                {randomSandwich ? (
                  <SandwichList
                    sandwiches={[randomSandwich]}
                    ratings={ratings}
                    handleRatingChange={handleRatingChange}
                  />
                ) : (
                  <SandwichList
                    sandwiches={filteredSandwiches}
                    ratings={ratings}
                    handleRatingChange={handleRatingChange}
                  />
                )}
              </main>
            }
          />
          <Route
            path="/filter"
            element={
              <FilterPage
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
              />
            }
          />

          {/* user authentication routes*/}
          <Route
            path="/login"
            element={
              <Login
                handleSubmit={loginUser}
                buttonLabel="Log In"
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                handleSubmit={signupUser}
                buttonLabel="Sign Up"
              />
            }
          />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

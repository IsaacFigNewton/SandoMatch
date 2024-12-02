import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import sandwichData from "./sandwiches.json";
import FilterPage from "./FilterPage";
import SandwichList from "./SandwichList";
import Login from "./Login";
import Signup from "./Signup";
import UserPage from "./UserPage";
import MyBookmarkedSandos from "./MyBookmarkedSandos";
import MyFavoriteSandos from "./MyFavoriteSando";
import MyReviews from "./MyReviews";
import MyTriedSandos from "./MyTriedSandos";

import "./App.css";

// const API_PREFIX = "http://sandomatch.azurewebsites.net";
const API_PREFIX = "http://localhost:8000";

function App() {
  const [sandwiches, setSandwiches] = useState(sandwichData);
  const [ratings, setRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [randomSandwich, setRandomSandwich] = useState(null);
  const [, setError] = useState(null);

  const INVALID_TOKEN = "INVALID_TOKEN";
  const [, setToken] = useState(INVALID_TOKEN);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [, setMessage] = useState("");
  const [filters, setFilters] = useState({
    include: [],
    exclude: []
  });

  const [, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const location = useLocation();

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

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

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

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (currUser && token) {
      setUser(currUser);
      setIsLoggedIn(true);
    }
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
          return response.json();
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .then((payload) => {
        localStorage.setItem("token", payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(payload.user)
        );
        setUser(payload.user);
        setIsLoggedIn(true);
        setMessage("Login Successful");
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
        return Promise.reject(error);
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

  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
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
          <div className="menuPopoutButton">
            <button
              className="menu-button"
              onClick={toggleMenu}
              aria-haspopup="true"
              aria-expanded={isMenuVisible}
            >
              Menu
            </button>

            {isMenuVisible && (
              <div className="menuPopout" role="menu">
                <ul className="menu-list">
                  <li role="menuitem">
                    <Link to="/user">Profile</Link>
                  </li>
                  <li role="menuitem">
                    <Link to="/reviews">My Reviews</Link>
                  </li>
                  <li role="menuitem">
                    <Link to="/favorites">
                      My Favorite Sando
                    </Link>
                  </li>
                  <li role="menuitem">
                    <Link to="/myBookmarked">
                      Bookmarked Sandos
                    </Link>
                  </li>
                  <li role="menuitem">
                    <Link to="/tried">Sandos I\'ve Tried</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link to="/" className="logo-link">
            <h1 className="app-logo">SandoMatch</h1>
          </Link>

          {/* filtering */}
          <Link to="/filter" className="filter-button">
            Filter
          </Link>

          {isLoggedIn ? (
            <div className="logout-button">
              <Link to="/">
                <button onClick={logoutUser}>Logout</button>
              </Link>
            </div>
          ) : (
            <>
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
            </>
          )}
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
          <Route
            path="/myBookmarked"
            element={<MyBookmarkedSandos />}
          />
          <Route
            path="/favorites"
            element={<MyFavoriteSandos />}
          />
          <Route path="/reviews" element={<MyReviews />} />
          <Route path="/tried" element={<MyTriedSandos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

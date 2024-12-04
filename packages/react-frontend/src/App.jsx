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
import UserPage from "./user-pages/UserPage";
import MyBookmarkedSandos from "./user-pages/MyBookmarkedSandos";
import MyFavoriteSandos from "./user-pages/MyFavoriteSando";
import MyReviews from "./user-pages/MyReviews";
import MyTriedSandos from "./user-pages/MyTriedSandos";

import "./App.css";
import filterIcon from "./assets/filter2.png";

const API_PREFIX = "http://sandomatch.azurewebsites.net";
//const API_PREFIX = "http://localhost:8000";

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
    dietary_tags: [],
    ingredients: {
      include: {
        breads: [],
        meats: [],
        cheeses: [],
        vegetables: [],
        condiments: [],
        spices: []
      },
      exclude: {
        breads: [],
        meats: [],
        cheeses: [],
        vegetables: [],
        condiments: [],
        spices: []
      }
    },
    maxCost: 1000,
    minCalories: 0,
    maxCalories: 1000,
    rating: 0
  });

  const [, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleRatingChange = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating
    }));
  };

  useEffect(() => {
    const savedRatings =
      JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const resetRandomSandwich = () => {
    setRandomSandwich(null);
    setSearchTerm(""); // Optional: Clear the search bar
  };

  const clearFilters = () => {
    setFilters({
      include: [],
      exclude: []
    });
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

  function bookmarkSandwich(sandwichId) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sign in to bookmark a sando");
      return;
    }

    console.log("Sending sandwichId:", sandwichId);

    fetch(`${API_PREFIX}/users/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ sandwichId })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to bookmark sandwich`);
        }
        return response.json();
      })
      .then(() => {
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            bookmarkedSandos: [
              ...prevUser.bookmarkedSandos,
              sandwichId
            ]
          };
          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
          return updatedUser;
        });
      })
      .catch((error) => {
        console.error("Error bookmarking sandwich:", error);
        alert("Failed to bookmark the sandwich.");
      });
  }

  function trySandwich(sandwichId) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sign in to try a sando");
      return;
    }

    console.log("Sending sandwichId:", sandwichId);

    fetch(`${API_PREFIX}/users/try`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ sandwichId })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to try sandwich`);
        }
        return response.json();
      })
      .then(() => {
        setUser((prevUser) => {
          console.log("prevUser:", prevUser);
          const updatedUser = {
            ...prevUser,
            triedSandos: [
              ...(prevUser.triedSandos || []),
              sandwichId
            ]
          };
          console.log("updatedUser:", updatedUser);
          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
          return updatedUser;
        });
      })
      .catch((error) => {
        console.error("Error trying sandwich:", error);
        alert("Failed to try the sandwich.");
      });
  }

  function favoriteSandwich(sandwichId) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Sign in to favorite a sando");
      return;
    }

    console.log("Sending sandwichId:", sandwichId);

    fetch(`${API_PREFIX}/users/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ sandwichId })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to set favorite sandwich");
        }
        return response.json();
      })
      .then(() => {
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            favoriteSando: sandwichId
          };
          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
          return updatedUser;
        });
      })
      .catch((error) => {
        console.error("Error favoriting sandwich:", error);
        alert("Failed to set favorite sandwich.");
      });
  }

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
          <Link
            to="/"
            className="logo-link"
            onClick={resetRandomSandwich}
          >
            <h1 className="app-logo">SandoMatch</h1>
          </Link>
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
                    <Link to="/tried">Sandos I Have Tried</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* generating a new sandwich */}

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
                {/* Search bar with filter icon */}
                <div className="search-filter-wrapper">
                  <Link
                    to="/filter"
                    className="filter-icon-link"
                  >
                    <img
                      src={filterIcon}
                      alt="Filter"
                      className="filter-icon"
                    />
                  </Link>
                  <input
                    type="text"
                    placeholder="Search for your perfect sandwich..."
                    className="search-bar"
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />
                </div>
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
                    bookmarkSandwich={bookmarkSandwich}
                    trySandwich={trySandwich}
                    favoriteSandwich={favoriteSandwich}
                  />
                ) : (
                  <SandwichList
                    sandwiches={filteredSandwiches}
                    ratings={ratings}
                    handleRatingChange={handleRatingChange}
                    bookmarkSandwich={bookmarkSandwich}
                    trySandwich={trySandwich}
                    favoriteSandwich={favoriteSandwich}
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
                clearFilters={clearFilters}
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

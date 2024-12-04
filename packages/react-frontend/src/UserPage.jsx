//UserPage.jsx
// import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MyFavoriteSando from "./MyFavoriteSando";
import { useEffect, useState } from "react";
import MyBookmarkedSandos from "./MyBookmarkedSandos";
import MyTriedSandos from "./MyTriedSandos";
import "./App.css";

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      setUser(currUser);
    }
  }, []);

  return (
    <div>
      <div>
      <h1>{user ? user._id : "Profile Page"}</h1>
        {user ? (
          <div className="user-link-buttons">
            <Link to="/favorites">
              <button className="fav-user-link">
                <p>
                  <strong>Favorite Sando</strong>{" "}
                </p>
              </button>
            </Link>
            <Link to="/myBookmarked">
              <button className="book-user-link">
                <p><strong>Bookmarked Sandwiches</strong>{" "}</p>
              </button>
            </Link>
            <Link to="/tried">
              <button className="tried-user-link">
                <p><strong>Tried Sandos</strong></p>
              </button>
            </Link>
          </div>
        ) : (
          <div className="login-notice">
            <p className="login-notice-text">
              Login{" "}
              <Link className="login-notice-link" to="/login">
                here
              </Link>{" "}
              to see user details.
            </p>
          </div>
        )}
      </div>

      <Routes>
        <Route
          path="/favorites"
          element={<MyFavoriteSando />}
        />
        <Route
          path="/myBookmarked"
          element={<MyBookmarkedSandos />}
        />
        <Route
          path="/tried"
          element={<MyTriedSandos />}
        />
      </Routes>
      </div>
  );
}

export default UserPage;

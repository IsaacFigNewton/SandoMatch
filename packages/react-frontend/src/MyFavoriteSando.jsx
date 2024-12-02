//MyFavoriteSandos.jsx
//import React from "react";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function MyFavoriteSandos() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      setUser(currUser);
    }
  }, []);

  return (
    <div>
      <h1>My Favorite Sando</h1>
      {user ? (
        <div>
          <p>
            <strong>Favorite:</strong> {user.favoriteSando}
          </p>
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
  );
}

export default MyFavoriteSandos;

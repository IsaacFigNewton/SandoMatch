//MyTriedSandos.jsx
//import React from "react";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function MyTriedSandos() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      setUser(currUser);
    }
  }, []);

  return (
    <div>
      <h1>My Tried Sandos</h1>
      {user ? (
        <div>
          <p>
            <strong>Tried Sandos:</strong> {user.triedSandos}
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

export default MyTriedSandos;

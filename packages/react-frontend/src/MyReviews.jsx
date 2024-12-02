//MyReviews.jsx
// import React from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyReviews() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      setUser(currUser);
    }
  }, []);

  return (
    <div>
      <h1>My Reviews</h1>
      {user ? (
        <div>
          <p>
            <strong>Reviews:</strong> {user.reviews}
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

export default MyReviews;

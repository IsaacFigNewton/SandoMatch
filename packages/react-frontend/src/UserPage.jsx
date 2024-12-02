//UserPage.jsx
// import React from "react";
import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser){
      setUser(currUser);
    }
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {user? (
        <div>
          <p><strong>Username:</strong> {user._id}</p>
          <p><strong>Favorite Sando:</strong> {user.favoriteSandwich}</p>
          <p><strong>Bookmarked Sandwiches:</strong> {user.bookmarkedSandos}</p>
          <p><strong>Reviews:</strong> {user.reviews}</p>
        </div>
      ) : (
        <div className="login-notice">
          <p className="login-notice-text">
            Login <Link className="login-notice-link" to="/login">here</Link> to see user details.
          </p>

        </div>
      )}
    </div>
  );
}

export default UserPage;

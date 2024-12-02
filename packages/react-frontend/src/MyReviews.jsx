//MyReviews.jsx
// import React from "react";
import { useEffect, useState } from "react";

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
        <p>Log In To See User Details</p>
      )}
    </div>
  );
}

export default MyReviews;

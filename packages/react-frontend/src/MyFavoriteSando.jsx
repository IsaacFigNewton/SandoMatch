//MyFavoriteSandos.jsx
//import React from "react";
import { useEffect, useState } from "react";

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
        <p>Log In To See User Details</p>
      )}
    </div>
  );
}

export default MyFavoriteSandos;

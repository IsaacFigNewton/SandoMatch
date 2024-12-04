//MyFavoriteSandos.jsx
//import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_PREFIX = "http://localhost:8000";

function MyFavoriteSandos() {
  const [user, setUser] = useState(null);
  const [favoriteSando, setFavoriteSando] = useState([]);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      setUser(currUser);

      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${API_PREFIX}/sandwiches`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Fail to get bookmarked sandos")
            } 
            return response.json();
          })
          .then((data) => {
            if (data.sandwiches_list) {
              const favorite = data.sandwiches_list.find(
                (sando) => sando._id === currUser.favoriteSando
              );

              console.log("Favorite sando", favoriteSando);
              setFavoriteSando(favorite);
            } else {
              console.error("No sandwiches_list found in response.");
            }
          })
          .catch((error) => {
            console.error("Error fetching sandos", error);
          });
      }
    }
  }, []);

  return (
    <div className="fav-card">
      <h1 className="title-fav">My Favorite Sando</h1>
      {user ? (
        favoriteSando ? (
          <div key={favoriteSando.id_} className="sandwich-card-fav">
            {/* header for sandwich cards holding name and buttons */}
            <div className="card-header">
              <h3>{favoriteSando.name}</h3>
            </div>
            {/* end header */}
            <ul>
              {Object.values(favoriteSando.ingredients || {})
                .flatMap((category) =>
                  Object.values(category).flat()
                )
                .map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <p>
              Cuisine: {" "}
              {favoriteSando.cuisine
                ? favoriteSando.cuisine
                : "Cuisine not specified"}
            </p>

          </div>
        ) : (
          <p>No favorite sando selected</p>
        )
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

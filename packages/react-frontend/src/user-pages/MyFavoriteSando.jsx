//MyFavoriteSandos.jsx
//import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";

import veganImg from "../assets/vegan2.png";
import vegetarianImg from "../assets/vegetarian.png";
import glutenFreeImg from "../assets/gluten-free.png";

//const API_PREFIX = "http://localhost:8000";
const API_PREFIX = "http://sandomatch.azurewebsites.net";

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
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Fail to get bookmarked sandos");
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
              console.error(
                "No sandwiches_list found in response."
              );
            }
          })
          .catch((error) => {
            console.error("Error fetching sandos", error);
          });
      }
    }
  }, []);

  const renderDietaryTags = (tags) => {
    const tagIcons = {
      vegan: veganImg,
      vegetarian: vegetarianImg,
      "gluten-free": glutenFreeImg
    };

    return (
      <div className="dietary-tags">
        {tags.includes("vegan") && (
          <img
            src={tagIcons.vegan}
            alt="Vegan"
            className="dietary-tag-icon"
          />
        )}
        {tags.includes("vegetarian") && (
          <img
            src={tagIcons.vegetarian}
            alt="Vegetarian"
            className="dietary-tag-icon"
          />
        )}
        {tags.includes("gluten-free") && (
          <img
            src={tagIcons["gluten-free"]}
            alt="Gluten-Free"
            className="dietary-tag-icon"
          />
        )}
      </div>
    );
  };

  const renderCostRange = (cost) => {
    if (cost < 5) return "$";
    if (cost < 10) return "$$";
    return "$$$";
  };

  const renderIngredients = (ingredients) => {
    const allIngredients = Object.values(
      ingredients || {}
    ).flatMap((category) => Object.values(category).flat());
    const displayedIngredients = allIngredients.slice(0, 3);
    return (
      <p>
        <strong>Ingredients:</strong>{" "}
        {displayedIngredients.join(", ")}{" "}
        {allIngredients.length > 3 && "..."}
      </p>
    );
  };

  return (
    <div className="fav-card">
      <h1 className="title-fav">My Favorite Sando</h1>
      {user ? (
        favoriteSando ? (
          <div
            key={favoriteSando.id_}
            className="sandwich-card-fav"
          >
            {/* header for sandwich cards holding name and buttons */}
            <div className="card-header">
              <h3>{favoriteSando.name}</h3>
            </div>
            {/* end header */}
            {renderIngredients(favoriteSando.ingredients)}
            <p>
              <strong>Cost:</strong>{" "}
              {renderCostRange(favoriteSando.costs)}
            </p>
            {renderDietaryTags(
              favoriteSando.dietary_tags || []
            )}
            <Rating rating={favoriteSando.rating || 0} />
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

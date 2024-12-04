//MyTriedSandos.jsx
//import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";

import veganImg from "../assets/vegan2.png";
import vegetarianImg from "../assets/vegetarian.png";
import glutenFreeImg from "../assets/gluten-free.png";

//const API_PREFIX = "http://localhost:8000";
const API_PREFIX = "http://sandomatch.azurewebsites.net";

function MyTriedSandos() {
  const [user, setUser] = useState(null);
  const [triedSandos, setTriedSandos] = useState([]);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      console.log(
        "Current User's Tried Sandos:",
        currUser.bookmarkedSandos
      );
      setUser(currUser);
      console.log(
        "Raw LocalStorage User Data:",
        localStorage.getItem("user")
      );
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${API_PREFIX}/sandwiches`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Fail to get tried sandos");
            }
            return response.json();
          })
          .then((data) => {
            console.log(
              "Fetched Sandwiches:",
              data.sandwiches_list
            );

            if (data.sandwiches_list) {
              const filteredSandos =
                data.sandwiches_list.filter((sando) =>
                  currUser.triedSandos.some(
                    (triedId) =>
                      parseInt(triedId, 10) === sando._id
                  )
                );
              setTriedSandos(filteredSandos);
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
    <div>
      <h1>My Tried Sandos</h1>
      {user ? (
        triedSandos.length > 0 ? (
          <div className="sandwich-list">
            {triedSandos.map((sandwich) => (
              <div key={sandwich.id_} className="sandwich-card">
                {/* header for sandwich cards holding name and buttons */}
                <div className="card-header">
                  <h3>{sandwich.name}</h3>
                </div>
                {/* end header */}
                {renderIngredients(sandwich.ingredients)}
                <p>
                  <strong>Cost:</strong>{" "}
                  {renderCostRange(sandwich.costs)}
                </p>
                {renderDietaryTags(sandwich.dietary_tags || [])}
                <Rating rating={sandwich.rating || 0} />
              </div>
            ))}
          </div>
        ) : (
          <p>No Tried Sandos Yet</p>
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

export default MyTriedSandos;

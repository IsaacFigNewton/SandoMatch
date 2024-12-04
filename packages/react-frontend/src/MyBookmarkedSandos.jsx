//MyBookmarkedSandos.jsx
//import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_PREFIX = "http://localhost:8000";

function MyBookmarkedSandos() {
  const [user, setUser] = useState(null);
  const [bookmarkedSandos, setBookmarkedSandos] = useState([]);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser) {
      console.log("Current User's Bookmarked Sandos:", currUser.bookmarkedSandos);
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
            console.log("Fetched Sandwiches:", data.sandwiches_list);

            if (data.sandwiches_list) {
              const filteredSandos = data.sandwiches_list.filter((sando) =>
                currUser.bookmarkedSandos.some((bookmarkedId) =>
                  parseInt(bookmarkedId, 10) === sando._id // Use _id directly
                )
              );

              
              setBookmarkedSandos(filteredSandos);
              console.log("Filtered Sandwiches:", filteredSandos);
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
    <div>
      <h1>My Bookmarked Sandos</h1>
      {user ? (
        bookmarkedSandos.length > 0 ? (
          <div className="sandwich-list">
          {bookmarkedSandos.map((sandwich) => (
            <div key={sandwich.id_} className="sandwich-card">
              {/* header for sandwich cards holding name and buttons */}
              <div className="card-header">
                <h3>{sandwich.name}</h3>
              </div>
              {/* end header */}
              <ul>
                {Object.values(sandwich.ingredients || {})
                  .flatMap((category) =>
                    Object.values(category).flat()
                  )
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
              <p>
                Cuisine: {" "}
                {sandwich.cuisine
                  ? sandwich.cuisine
                  : "Cuisine not specified"}
              </p>
  
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

export default MyBookmarkedSandos;

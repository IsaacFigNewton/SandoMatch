//MyTriedSandos.jsx
//import React from "react";
import React, { useEffect, useState } from "react";

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
        <p>Log In To See User Details</p>
      )}
    </div>
  );
}

export default MyTriedSandos;

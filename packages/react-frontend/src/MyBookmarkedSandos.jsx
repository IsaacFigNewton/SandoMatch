//MyBookmarkedSandos.jsx
//import React from "react";
import React, {useEffect, useState} from "react";

function MyBookmarkedSandos() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    if (currUser){
      setUser(currUser);
    }
  }, []);

    return (
    <div>
      <h1>My Bookmarked Sandos</h1>
      {user? (
        <div>
          <p><strong>Bookmarked:</strong> {user.bookmarkedSandos}</p>
        </div>
      ) : (
        <p>Log In To See User Details</p>
      )}
    </div>
  );
  }
  
  export default MyBookmarkedSandos;
  

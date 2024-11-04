import React, { useState, useEffect } from "react";

function MyApp() {
  const [sandwiches, setSandwiches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5173/sandwich-dataset/formatted_sandwich_entries.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => setSandwiches(data))
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(sandwiches, null, 2)}</pre>
    </div>
  );
}

export default MyApp;

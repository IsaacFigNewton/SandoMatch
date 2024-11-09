import React, { useState, useEffect } from "react";

function MyApp() {
  const [sandwiches, setSandwiches] = useState([]);
  const [error, setError] = useState(null);

  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5173/sandwich-dataset/formatted_sandwich_entries  .json")
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

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader()
    });

    return promise;
  }

  const promise = fetch(`${API_PREFIX}/users`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(person)
  });

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; 
            auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

  return (
    <div className="container">
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(sandwiches, null, 2)}</pre>
    </div>
    <Route
      path="/login"
      element={<Login handleSubmit={loginUser} />}
    />
    <Route
      path="/signup"
      element={
        <Login handleSubmit={signupUser} buttonLabel="Sign Up" />
      }
    />
  );
}

export default MyApp;

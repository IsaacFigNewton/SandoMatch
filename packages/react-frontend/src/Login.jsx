import React, { useState } from "react";

function Login({ handleSubmit, buttonLabel = "Log In" }) {
  const [creds, setCreds] = useState({ username: "", pwd: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(creds);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="pwd"
          value={creds.pwd}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default Login;

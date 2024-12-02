import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleSubmit, buttonLabel = "Log In" }) {
  // property validation
  if (!handleSubmit || !buttonLabel) {
    throw new Error(
      "Insufficient arguments provided to Login function."
    );
  }

  const [creds, setCreds] = useState({ username: "", pwd: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(creds)
      .then(() => {
        navigate("/user");
      })
      .catch((error) => {
        console.error("Login Failed", error);
        alert("Invalid username or password.");
      });
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="user-form">
          <label className="username-label">
            Username:{" "}
            <input
              className="user-input"
              type="text"
              name="username"
              value={creds.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="pwd-form">
          <label className="pwd-label">
            Password:{" "}
            <input
              className="pwd-input"
              type="password"
              name="pwd"
              value={creds.pwd}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">
          {buttonLabel}
        </button>
      </form>
      <p className="signup-text">
        Don&apos;t have an account?{" "}
        <Link className="signup-link" to="/signup">
          {" "}
          Sign up here.
        </Link>
      </p>
    </div>
  );
}

// Validate Login page props
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired
};

export default Login;

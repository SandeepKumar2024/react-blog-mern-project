import React, { useState } from "react";
import axios from "axios";
import "./register.scss";

const Register = () => {
  // Define state variables for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // To store error messages
  console.log(error)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the backend API for registration
      await axios.post("http://localhost:5000/api/v2/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
      });

      window.location.href = "/login";
    } catch (err) {
      
      setError(err.response?.data?.error || err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{color:"red"}}>{error}</p>}{" "}
          {/* Show error message */}
          <button type="submit" className="auth-button">
            Register
          </button>
          <p className="auth-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

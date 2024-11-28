import React, { useState } from "react";
import axios from "axios"; 
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      // Send POST request to backend API for login
      const response = await axios.post("http://localhost:5000/api/v2/auth/login", {
        email,
        password,
      });

      // If login is successful, store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the home page
      window.location.href = "/"; 
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          
          {error && <p style={{color:"red"}}>{error}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>

          <p className="auth-footer">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

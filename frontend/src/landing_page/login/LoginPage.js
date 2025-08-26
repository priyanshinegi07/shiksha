import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/login", formData);
    console.log(res.data.message);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    if (res.data) {
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("role", res.data.role);
    }

    // Navigate based on role
    if (res.data.role === "student") {
      navigate("/student-dashboard");
    } else if (res.data.role === "tutor") {
      navigate("/tutor-dashboard");
    }
  } catch (err) {
    if (err.response && err.response.status === 404 && err.response.data.message === "User not found") {
      // Prompt user to register if not found
      if (window.confirm("User not found. Do you want to register now?")) {
        navigate("/signup");
      }
    } else if (err.response && err.response.status === 401) {
      alert("Incorrect password. Try again.");
    } else {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  }
};

  return (
    <>
      <Navbar />
      <div className="login-container">
        {/* Left side - Illustration */}
        <div className="login-left">
          <img
            src="/media/images/5836.jpg"
            alt="Education Illustration"
            className="login-illustration"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="login-right">
          <h2>Login to ShikshaConnect</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

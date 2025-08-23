import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login", formData);
      console.log(res.data.message);
    } catch (err) {
      console.log("error logging in" + err);
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

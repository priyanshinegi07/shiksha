import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();
  //handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
      console.log(res.data.message);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data) {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("role", res.data.role);
        console.log("id ", localStorage.getItem("id"))
      }
      console.log(res.data)
      if (res.data.role === "student") {
        console.log("inside if")
        navigate("/student-details");
      } else if (res.data.role === "tutor") {
        navigate("/tutor-details");
      }
    } catch (err) {
      console.log("err" + err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="login-container">
        {/* Right side - Signup Form */}
        <div className="login-right">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>

            <button type="submit" className="login-btn">
              Register
            </button>
          </form>
        </div>

        {/* Left side - Illustration */}
        <div className="login-left">
          <img
            src="/media/images/5836.jpg"
            alt="Education Illustration"
            className="login-illustration"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;

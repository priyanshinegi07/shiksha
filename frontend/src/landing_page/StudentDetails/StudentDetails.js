import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Details.module.css";

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    classLevel: "",
    subject: "",
    feePerHour: "",
    mode: "",
    location: "",
    contactInfo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const dataToSend = {
      ...formData,
      subject: formData.subject.split(",").map((s) => s.trim()),
    };
    try {
      const res = await axios.post("http://localhost:8080/students", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Details saved successfully");
      navigate("/student-dashboard");
    } catch (err) {
      console.log("error saving details", err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Complete Student Profile</h2>

        <div className={styles.formGroup}>
          <label>Class/Grade</label>
          <input name="classLevel" type="number" value={formData.classLevel} onChange={handleChange} required max={12} />
        </div>

        <div className={styles.formGroup}>
          <label>Subjects (comma separated)</label>
          <input name="subject" value={formData.subject} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Fee per hour</label>
          <input name="feePerHour" type="number" placeholder="min Rs100" value={formData.feePerHour} onChange={handleChange} required min={100} />
        </div>

        <div className={styles.formGroup}>
          <label>Mode</label>
          <select name="mode" value={formData.mode} onChange={handleChange} required>
            <option value="">Select mode</option>
            <option value="student_home">Student's Home</option>
            <option value="tutor_home">Tutor's Home</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location</label>
          <input name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Contact Info</label>
          <input name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
        </div>

        <button type="submit">Save details</button>
      </form>
    </div>
  );
};

export default StudentDetails;

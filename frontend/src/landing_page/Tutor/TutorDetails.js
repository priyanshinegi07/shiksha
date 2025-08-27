import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Details.module.css"

const TutorDetails = () => {
    const [formData, setFormData] = useState({
        feePerHour:"",
        mode:"",
        location:"",
        contactInfo:"",
        experienceYears:"",
        qualification:"",
        subjects:""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const dataToSend = {
            ...formData, 
            subjects: formData.subjects.split(",").map((s) => s.trim())
        }
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/tutors`,
                dataToSend,
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            navigate('/tutor-dashboard');
        }
        catch(err) {
            console.log("error saving details" + err)
        }

    }
  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Complete Tutor Profile</h2>
        <div className={styles.formGroup}>
          <label>Fee Per Hour</label>
          <input
            name="feePerHour"
            type="number"
            placeholder="min Rs100"
            value={formData.feePerHour}
            onChange={handleChange}
            required
            min={100}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Mode</label>
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
          <option value="">Select Mode</option>
          <option value="student_home">Student's Home</option>
          <option value="tutor_home">Tutor's Home</option>
          <option value="Online">Online</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contact Info</label>
          <input
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
            <label>Experience(in years)</label>
            <input
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                required
                />
            
        </div>
        <div className={styles.formGroup}>
            <label>Qualification</label>
            <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                />
            
        </div>
        <div className={styles.formGroup}>
          <label>Subjects(comma separated)</label>
          <input
            name="subjects"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <button>Save details</button>
      </form>
    </div>
  );
};

export default TutorDetails;

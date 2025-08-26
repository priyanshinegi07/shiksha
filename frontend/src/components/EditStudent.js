import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    classLevel: 0,
    feePerHour: 0,
    mode: "",
    location: "",
    subject: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch current logged-in student's details
  useEffect(() => {
    const fetchStudent = async () => {
      const id = localStorage.getItem("id")
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/students/${id}/edit`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setFormData({
  ...res.data,
  classLevel: Number(res.data.classLevel, 10) || 0,
  feePerHour: Number(res.data.feePerHour, 10) || 0,
  subject: res.data.subject || [],
});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "subject") {
    setFormData(prev => ({
      ...prev,
      subject: value.split(",").map(s => s.trim()),
    }));
  } else if (name === "classLevel" || name === "feePerHour") {
  setFormData(prev => ({
    ...prev,
    [name]: value === "" ? "" : Number(value, 10),
  }));
}else {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id")
    try {
      console.log("Sending update:", formData);
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:8080/students/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Student details updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error updating details");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  
  return (
    <div className="container mt-5 w-75">
      <h2 className="text-primary fw-bold mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit} className="card shadow-lg p-4">
        <div className="mb-3">
          <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder="Name"
            />
        </div>
        
        <div className="mb-3">
          <label className="form-label fw-bold">Class/Grade</label>
        <input
          type="number"
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Class Level"
        />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Fee Per Hour</label>
        <input
          type="number"
          name="feePerHour"
          value={formData.feePerHour}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Fee per Hour"
        />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Mode</label>
        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="form-select mb-3"
        >
          <option value="">-- Select Mode --</option>
          <option value="student_home">Student Home</option>
          <option value="tutor_home">Tutor Home</option>
          <option value="online">Online</option>
        </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Location"
        />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Subjects</label>
        <input
          type="text"
          name="subject"
          value={formData.subject.join(", ")}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Subjects (comma separated)"
        />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditStudent;

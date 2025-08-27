import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTutor = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    feePerHour: "",
    mode: "",
    location: "",
    subjects: [],
    contactInfo:"",
    experienceYears:"",
    qualification:""

  });
  const [loading, setLoading] = useState(true);

  // Fetch student details to pre-fill the form
    

  useEffect(() => {
    const fetchTutor = async () => {
      try {
      
        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tutors/${id}/edit`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
  ...res.data,
  feePerHour: Number(res.data.feePerHour, 10) || 0,
  subject: res.data.subject || [],
});
      } catch (err) {
        console.error("err", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, []);

  // Handle input change
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "subjects") {
    setFormData(prev => ({
      ...prev,
      subjects: value.split(",").map(s => s.trim()),
    }));
  } else if (name === "feePerHour") {
  setFormData(prev => ({
    ...prev,
    [name]: value === "" ? "" : Number(value),
  }));
}else {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
};

  // Form validation
//   const validateForm = () => {
//     if (!formData.name.trim()) return "Name is required.";
//     if (!formData.classLevel) return "Class level is required.";
//     if (!formData.feePerHour) return "Fee per hour is required.";
//     if (!formData.mode) return "Mode is required.";
//     if (!formData.location.trim()) return "Location is required.";
//     if (!formData.subjects.length) return "At least one subject is required.";
//     return null;
//   };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const errorMsg = validateForm();
    // if (errorMsg) {
    //   alert(errorMsg);
    //   return;
    // }

    try {
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/tutors/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Tutor details updated successfully!");
      navigate(`/`);
    } catch (err) {
      console.error(err);
      alert("Error updating details");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 w-75">
      <h2 className="text-primary fw-bold mb-4">Edit Tutor</h2>
      <form onSubmit={handleSubmit} className="card shadow-lg p-4">
        <div className="mb-3">
          <label className="form-label fw-bold">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        

        <div className="mb-3">
          <label className="form-label fw-bold">Fee per Hour</label>
          <input
            type="number"
            className="form-control"
            name="feePerHour"
            value={formData.feePerHour}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Mode</label>
          <select
            className="form-select"
            name="mode"
            value={formData.mode}
            onChange={handleChange}
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
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Subjects (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="subjects"
            value={formData.subjects.join(", ")}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Experience in Years</label>
          <input
            type="text"
            className="form-control"
            name="experienceYears"
            value={formData.experienceYears}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Qualification</label>
          <input
            type="text"
            className="form-control"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Contact Info</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Update Tutor
        </button>
      </form>
    </div>
  );
};

export default EditTutor;

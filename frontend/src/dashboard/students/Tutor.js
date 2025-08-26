import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Tutor = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        console.log("res")
        const token = localStorage.getItem("token");
        console.log("Token in frontend:", localStorage.getItem("token"));
        const res = await axios.get(`http://localhost:8080/tutors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setTutor(res.data);
      } catch (err) {
        console.error("Error fetching tutor details:", err);
      }
    };
    fetchTutor();
  }, [id]);

  if (!tutor) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    //   </div>
    </div>
    // <></>
    );

  return (
    <div className="container mt-5 w-75">
      <div className="card shadow-lg border-primary border-3 rounded-4 p-4">
        <h2 className="text-primary fw-bold mb-4">{tutor.name}</h2>
        <p>
          <strong>Fee per Hour:</strong>{" "}
          <span className="badge bg-success fs-6">₹{tutor.feePerHour}</span>
        </p>
        <p>
          <strong>Mode:</strong>{" "}
          <span className="badge bg-info text-dark">{tutor.mode}</span>
        </p>
        <p>
          <strong>Location:</strong> {tutor.location}
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="badge bg-warning text-dark">
            {tutor.experienceYears} years
          </span>
        </p>
        <p>
          <strong>Qualification:</strong> {tutor.qualification}
        </p>
        <p>
          <strong>Subjects:</strong>{" "}
          {tutor.subjects.map((sub, index) => (
            <span
              key={index}
              className="badge bg-secondary me-1 mb-1"
              style={{ fontSize: "0.9rem" }}
            >
              {sub}
            </span>
          ))}
        </p>
        <Link to={`/tutors/${tutor._id}/edit`} className="btn btn-warning">
                    Edit
                  </Link>
        <button className="btn btn-outline-primary btn-sm">
                    Request Contact
                  </button>
      </div>
    </div>
  );
};

export default Tutor;

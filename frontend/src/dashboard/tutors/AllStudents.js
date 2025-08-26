import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/students");
        console.log(res.data);
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
  }, []);
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view student details");
      navigate("/login");
    } else {
      // navigate to details page (where you’ll call the protected API with token)
      navigate(`/students/${id}`);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">
        Student Profiles
      </h2>
      <div className="row">
        {students.map((student) => (
          <div className="col-md-4 col-sm-6 mb-4" key={student._id}>
            <div
              className="card border-0 shadow-lg h-100 student-card"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body bg-light">
                <h5 className="card-title text-success fw-bold">
                  {student.name}
                </h5>
                <hr />
                <p className="mb-1">
                  <strong>Class Level:</strong> {student.classLevel}
                </p>
                <p className="mb-1">
                  <strong>Subjects:</strong> {student.subject.join(", ")}
                </p>
                <p className="mb-1">
                  <strong>Fee per Hour:</strong>
                  <span className="text-danger fw-bold">
                    {" "}
                    ₹{student.feePerHour}
                  </span>
                </p>
                <p className="mb-1">
                  <strong>Mode:</strong>
                  <span className="badge bg-info text-dark ms-1">
                    {student.mode.replace("_", " ")}
                  </span>
                </p>
                <p className="mb-1">
                  <strong>Location:</strong> {student.location}
                </p>
                {/* <p className="mb-1"><strong>Contact:</strong> {student.contactInfo}</p> */}
              </div>
              <div className="text-center my-2">
                <button
                  onClick={() => handleViewDetails(student._id)}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </button>
              </div>
              <button className="btn btn-outline-primary btn-sm">
                Request Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudent();
  }, [id]);
  if (!student)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return (
    <div className="container mt-5 w-75">
      <div className="card shadow-lg border-primary border-3 rounded-4 p-4">
        <h2 className="text-primary fw-bold mb-4">{student.name}</h2>
        <p>
          <strong>Class/Grade</strong>{" "}
          <span className="badge bg-success fs-6">{student.classLevel}</span>
        </p>
        <p>
          <strong>Fee per Hour:</strong>{" "}
          <span className="badge bg-success fs-6">₹{student.feePerHour}</span>
        </p>
        <p>
          <strong>Mode:</strong>{" "}
          <span className="badge bg-info text-dark">{student.mode}</span>
        </p>
        <p>
          <strong>Location:</strong> {student.location}
        </p>

        <p>
          <strong>Subjects:</strong>{" "}
          {student.subject.map((sub, index) => (
            <span
              key={index}
              className="badge bg-secondary me-1 mb-1"
              style={{ fontSize: "0.9rem" }}
            >
              {sub}
            </span>
          ))}
        </p>
        {/* <Link to={`/students/${student._id}/edit`} className="btn btn-warning">
          Edit
        </Link> */}

        <button className="btn btn-outline-primary btn-sm">
          Request Contact
        </button>
      </div>
    </div>
  );
};

export default Student;

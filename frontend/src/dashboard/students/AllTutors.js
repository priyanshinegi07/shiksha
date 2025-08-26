import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const AllTutors = () => {
    const [tutors, setTutors] = useState([]);
    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/tutors", {
                    headers: {Authorization:`Bearer ${token}`} 
                })
                console.log(res.data)
                setTutors(res.data);
            }
            catch(err) {
                console.log(err);
            }
           
        }
        fetchTutors(); 
    }, [])
    const navigate = useNavigate();
    const handleViewDetails = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view tutor details");
      navigate("/login");
    } else {
      // navigate to details page (where you’ll call the protected API with token)
      navigate(`/tutors/${id}`);
    }
  };
  return (
  <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">
        Tutors Profiles
      </h2>
      <div className="row">
        {tutors.map((tutor) => (
          <div className="col-md-4 col-sm-6 mb-4" key={tutor._id}>
            <div
              className="card border-0 shadow-lg h-100 student-card"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body bg-light">
                <h5 className="card-title text-success fw-bold">
                  {tutor.name}
                </h5>
                <hr />
                {/* <p className="mb-1">
                  <strong>Class Level:</strong> {student.classLevel}
                </p> */}
                <p className="mb-1">
                  <strong>Subjects:</strong> {tutor.subjects.join(", ")}
                </p>
                <p className="mb-1">
                  <strong>Fee per Hour:</strong>
                  <span className="text-danger fw-bold">
                    {" "}
                    ₹{tutor.feePerHour}
                  </span>
                </p>
                <p className="mb-1">
                  <strong>Mode:</strong>
                  <span className="badge bg-info text-dark ms-1">
                    {tutor.mode.replace("_", " ")}
                  </span>
                </p>
                <p className="mb-1">
                  <strong>Location:</strong> {tutor.location}
                </p>
                
              </div>
               <div className="text-center my-2">
                <button
                  onClick={() => handleViewDetails(tutor._id)}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </button>
              </div>
                {/* <Link to={`/tutors/${tutor._id}/edit`} className="btn btn-warning">
                                    Edit
                                  </Link> */}
              <div className="text-center mb-2">
                  <button className="btn btn-outline-primary btn-sm">
                    Request Contact
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTutors
import React from "react";

const Testimonials = () => {
  return (
    <div className="container my-5 mt-5">
      <h2 className="text-center mb-4 fw-bold" 
      style={{color:"brown"}}>
        What Our Students and Teachers Say About Us?
      </h2>

      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          <div className="carousel-item active">
            <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "600px" }}>
              <div className="card-body text-center">
                <p className="lead text-secondary">
                  "This platform helped me find the best tutor for my needs. Highly recommended!"
                </p>
                <h5 className="fw-bold" style={{color:"#b08968"}}>- Priya Sharma</h5>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "600px" }}>
              <div className="card-body text-center">
                <p className="lead text-secondary">
                  "Very easy to use and the tutors are amazing. My grades improved a lot."
                </p>
                <h5 className="fw-bold" style={{color:"#b08968"}}>- Arjun Mehta</h5>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "600px" }}>
              <div className="card-body text-center">
                <p className="lead text-secondary">
                  "A perfect solution for online learning. The interface is simple and mobile-friendly."
                </p>
                <h5 className="fw-bold" style={{color:"#b08968"}}>- Neha Gupta</h5>
              </div>
            </div>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-primary rounded-circle p-2"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-primary rounded-circle p-2"></span>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;

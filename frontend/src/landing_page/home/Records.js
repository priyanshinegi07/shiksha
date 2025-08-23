import React from "react";

const Records = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row text-center">

          {/* Requirement Posted */}
          <div className="col-12 col-md-4 mb-4">
            <img
              src="/media/images/requirement.png"
              alt="Requirement"
              className="mb-3"
              style={{ width: "90px", height: "90px" }}
            />
            <h3 className="fw-bold" style={{color:"#9c6644"}}>12,500+</h3>
            <p className="mb-0">Requirements Posted</p>
          </div>

          {/* Registered Tutors */}
          <div className="col-12 col-md-4 mb-4">
            <img
              src="/media/images/tutors.png"
              alt="Tutors"
              className="mb-3"
              style={{ width: "90px", height: "90px" }}
            />
            <h3 className="fw-bold" style={{color:"#9c6644"}}>350,000+</h3>
            <p className="mb-0">Registered Tutors</p>
          </div>

          {/* Rating */}
          <div className="col-12 col-md-4 mb-4">
            <img
              src="/media/images/rating.png"
              alt="Rating"
              className="mb-3"
              style={{ width: "90px", height: "90px" }}
            />
            <h3 className="fw-bold" style={{color:"#9c6644"}}>4.5+</h3>
            <p className="mb-0">Rating on Social Media</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Records;

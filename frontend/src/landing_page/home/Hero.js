import React from "react";

const Hero = () => {
  return (
    <section
      className="text-center py-5"
    >
      <div className="container">
        <img
          src="/media/images/OHDELA-HowItWorks-Hero.webp"
          alt="Learning"
          className="img-fluid mb-4 shadow rounded"
          style={{ maxWidth: "60%", height: "auto" }}
        />
        <h1 className="display-5">
          Learn Anytime, Anywhere with the Best Tutors
        </h1>
        <p className="lead">
          Connect with expert teachers and grow your skills — all from the
          comfort of your home.
        </p>

        <a href="/signup" className="btn btn-lg mt-3 shadow btn-primary">
          Sign Up for Free
        </a>
      </div>
    </section>
  );
};

export default Hero;

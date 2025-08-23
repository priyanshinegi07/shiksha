import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-5 bg-white text-center">
      <div className="container">
        <h2 className=" mb-3" style={{color:"#774e24"}}>

          Not sure yet?
        </h2>
        <p className="fw-bold mb-4" style={{color:"#774e24"}}>
          Take a free online counselling class from us and clear your confusions.
        </p>
        <a href="/book-demo" className="btn btn-primary btn-lg shadow">
          Book a Free Demo Online
        </a>
      </div>
    </section>
  );
};

export default CallToAction;

import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4 mt-5">
      <div className="container text-center">
        
        <h5 className="mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          ShikshaMadeEasy
        </h5>

        <div className="mb-3">
          <a href="/privacy" className="text-white text-decoration-none mx-2">
            Privacy Policy
          </a>
          |
          <a href="/terms" className="text-white text-decoration-none mx-2">
            Terms of Service
          </a>
        </div>

        <div className="mb-3">
          <a href="#" className="text-white mx-2">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white mx-2">
            <FaTwitter />
          </a>
          <a href="#" className="text-white mx-2">
            <FaLinkedinIn />
          </a>
          <a href="#" className="text-white mx-2">
            <FaInstagram />
          </a>
        </div>

        <p className="mb-0">
          &copy; {new Date().getFullYear()} ShikshaMadeEasy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

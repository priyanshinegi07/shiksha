import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  console.log(id);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      const endpoint =
        role === "tutor"
          ? `http://localhost:8080/tutors/${id}`
          : `http://localhost:8080/students/${id}`;

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Account deleted successfully.");
        localStorage.clear();
        navigate("/signup");
      } else {
        alert("Error deleting account.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-md"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/media/images/shiksha_logo.png"
            alt="Shiksha Logo"
            className="img-fluid logo-img"
          />
          <span className="brand-text ms-2">ShikshaMadeEasy</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {role === "student" && token && (
              <li className="nav-item">
                <Link className="nav-link" to="/student-dashboard">
                  Tutors
                </Link>
              </li>
            )}

            {role === "tutor" && token && (
              <li className="nav-item">
                <Link className="nav-link" to="/tutor-dashboard">
                  Students
                </Link>
              </li>
            )}

            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/students">
                    Students
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tutors">
                    Tutors
                  </Link>
                </li>
              </>
            )}

            {token ? (
              <>
                  <li className="nav-item dropdown">
  <button
    className="btn btn-outline-primary dropdown-toggle w-100"
    id="profileDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Profile
  </button>
  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
    <li>
      <button
        className="dropdown-item w-100"
        onClick={() => navigate(`/${role}s/edit`)}
      >
        Edit Profile
      </button>
    </li>
    <li>
      <button
        className="dropdown-item w-100 text-danger"
        onClick={handleDeleteAccount}
      >
        Delete Profile
      </button>
    </li>
    <li>
      <button
        className="dropdown-item w-100 btn-outline-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  </ul>
</li>

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

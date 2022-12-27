import React from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  let user;
  if (token) {
    user = jwt_decode(token);
  } else {
    return false;
  }
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.pathname = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex">
        <Link className="navbar-brand" to="/">
          Company Name
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addCustomer">
                Add Customer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link bg-warning px-1 fw-bolder"
                to={user.adminRole && "/ZGFzaGJvYXJk"}
              >
                {user.name}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-danger" onClick={logOut}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

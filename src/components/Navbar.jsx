import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  // used to indicate what URL path we are in
  const location = useLocation();

  return (
    <nav className="nav-container">
      {/* Home */}
      <Link to="/" className="nav-link">
        Home
      </Link>
      {/* Mission */}
      <Link to="/mission" className="nav-link">
        Mission
      </Link>

      {/* Visualization (LIST) */}
      <Link to="/visualization/" className="nav-link">
        Visualization
      </Link>

      {/* Compare */}
      <Link to="/compare" className="nav-link nav-compare">
        Compare
      </Link>
    </nav>
  );
};

export default Navbar;

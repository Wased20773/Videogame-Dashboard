import { Link, useLocation } from "react-router-dom";
import DownArrow from "./SVG/DownArrow.jsx";
import "../styles/navbar.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [dropdownClicked, setDropDownClicked] = useState(false);

  // used to indicate what URL path we are in
  const location = useLocation();

  // Just for testing
  useEffect(() => {
    console.log(dropdownClicked);
  }, [dropdownClicked]);

  useEffect(() => {
    setDropDownClicked(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="nav-container">
        <ul className="nav-list">
          {/* Home */}
          <li className={`nav-item ${location.pathname === "/" && "active"}`}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {/* Mission */}
          <li
            className={`nav-item ${
              location.pathname === "/mission" && "active"
            }`}
          >
            <Link to="/mission" className="nav-link">
              Mission
            </Link>
          </li>

          {/* Visualization (LIST) */}
          <li
            className={`nav-item ${
              [
                "/visualizations/top-selling",
                "/visualizations/new-releases",
                "/visualizations/most-common",
                "/visualizations/trends",
              ].includes(location.pathname) && "active"
            }`}
          >
            <Link
              className="nav-link dropdown-btn"
              onClick={() => setDropDownClicked((prev) => !prev)}
            >
              Visualization
              <DownArrow rotate={dropdownClicked} stroke={10} width={15} />
            </Link>
          </li>

          {/* Compare */}
          <li
            className={`nav-item ${
              location.pathname === "/compare" && "active"
            }`}
          >
            <Link to="/compare" className="nav-link nav-compare">
              Compare
            </Link>
          </li>
        </ul>
      </nav>
      {/* Drop Down Options
          - Column Chart (top-selling)
            - genres
            - average playtime
            - average time-to-beat
            - discount effects to show before and after for games on special offers
          - Tables
            - new releases
          - Pie Charts (max 10 divisions)
            - most common genres
            - platform availability
            - language availability
          - Histogram (2010 - 2015)
            - release year trends
        */}
      {/* Drop Down Options List */}

      <div className={`dropdown-container ${dropdownClicked && "open"}`}>
        <Link to="/visualizations/top-selling" className="dropdown-item">
          top selling
        </Link>
        <Link to="/visualizations/new-releases" className="dropdown-item">
          new releases
        </Link>
        <Link to="/visualizations/most-common" className="dropdown-item">
          most common
        </Link>
        <Link to="/visualizations/trends" className="dropdown-item">
          trends
        </Link>
      </div>
    </>
  );
};

export default Navbar;

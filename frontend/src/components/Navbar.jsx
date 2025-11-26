import { Link, useLocation } from "react-router-dom";
import Arrow from "./SVG/Arrow.jsx";
import "../styles/navbar.css";
import { useEffect, useState } from "react";
import BurgerButton from "./SVG/BurgerButton.jsx";

const Navbar = () => {
  const [dropdownClicked, setDropDownClicked] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  // used to indicate what URL path we are in
  const location = useLocation();

  useEffect(() => {
    setDropDownClicked(false);
    setOpenSideBar(false);
  }, [location.pathname]);

  return (
    <div>
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
              <Arrow
                rotate={dropdownClicked}
                degrees={180}
                stroke={10}
                width={15}
              />
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

      <nav className="nav-container-mobile">
        <ul className="nav-list left">
          <li className="nav-item">
            <div
              className="burger-btn"
              onClick={() => setOpenSideBar((prev) => !prev)}
            >
              <BurgerButton height={35} stroke={1} />
            </div>
          </li>
        </ul>

        <ul className="nav-list right">
          {/* Home */}
          <li className={`nav-item ${location.pathname === "/" && "active"}`}>
            <Link to="/" className="nav-link">
              Home
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
        <div
          className="nav-link dropdown-btn"
          style={{ rotate: "90deg" }}
          onClick={() => setDropDownClicked((prev) => !prev)}
        >
          <Arrow rotate={dropdownClicked} stroke={10} width={30} />
        </div>
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

      {/* Sidebar for Burger Buttton */}
      <div className={`nav-sidebar-cover ${openSideBar && "open-cover"}`}>
        <div className={`nav-sidebar ${openSideBar && "open-sidebar"}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <div
                className="nav-link dropdown-btn"
                style={{ rotate: "90deg" }}
                onClick={() => setOpenSideBar((prev) => !prev)}
              >
                <Arrow rotate={dropdownClicked} stroke={10} width={30} />
              </div>
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
                <div style={{ rotate: "-90deg", marginLeft: "20" }}>
                  <Arrow rotate={dropdownClicked} stroke={10} width={30} />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

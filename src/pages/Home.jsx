import React from "react";
import SteamPNG from "../assets/steam.png";
import IGDBPNG from "../assets/igdb.png";
import "../styles/home.css";
import APIinfoCard from "../components/APIinfoCard";
import { APIinfo } from "../assets/data/APIinfo.jsx";
const Home = () => {
  return (
    <div>
      <div className="hero-container">
        <h1 className="hero-title">Games Dashboard</h1>
        <h2 className="hero-text">Over 500,000 games from API's</h2>
      </div>

      <h3 style={{ textAlign: "center" }}>API's that are in place</h3>

      <div className="cards-container">
        {/* Render each card with their API info  */}
        {Object.values(APIinfo).map((api) => (
          <APIinfoCard api={api} theme={api.theme} width_img={50} />
        ))}
      </div>
    </div>
  );
};

export default Home;

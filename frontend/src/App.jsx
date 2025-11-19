import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Mission from "./pages/Mission.jsx";
import ColumnChart from "./components/Charts/ColumnChart.jsx";
// import Table from "./components/Charts/Table.jsx";
import PieChart from "./components/Charts/PieChart.jsx";
import Histogram from "./components/Charts/Histogram.jsx";

import Compare from "./pages/Compare.jsx";
import Footer from "./components/Footer.jsx";
import NewReleases from "./pages/NewReleases.jsx";
import MostCommon from "./pages/MostCommon.jsx";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="main-contents">
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/mission" Component={Mission}></Route>

          {/* Visualizations */}
          <Route
            path="/visualizations/top-selling"
            Component={ColumnChart}
          ></Route>
          <Route
            path="/visualizations/new-releases"
            Component={NewReleases}
          ></Route>
          <Route
            path="/visualizations/most-common"
            Component={MostCommon}
          ></Route>
          <Route path="/visualizations/trends" Component={Histogram}></Route>

          <Route path="/compare" Component={Compare}></Route>

          {/* Not sure about this one */}
          <Route path="/legal"></Route>

          {/* Page not found */}
          <Route path="*"></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

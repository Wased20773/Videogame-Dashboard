import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Mission from "./pages/Mission.jsx";
import Compare from "./pages/Compare.jsx";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/mission" Component={Mission}></Route>

        {/* Maybe? */}
        <Route path="/visualization/something"></Route>
        <Route path="/compare" Component={Compare}></Route>

        {/* Not sure about this one */}
        <Route path="/legal"></Route>

        {/* Page not found */}
        <Route path="*"></Route>
      </Routes>
    </>
  );
}

export default App;

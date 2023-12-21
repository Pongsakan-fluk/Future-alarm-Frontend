import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Manage from "./pages/Manage";



function App() {
  return (
    <>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/:id" element={<Manage />} />
        </Routes>
      </main>

    </>
  );
}

export default App;

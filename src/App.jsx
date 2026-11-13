import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Image from "./Pages/Image";
import Error from "./Pages/Error";
import logo from "./assets/logo.svg";

function App() {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className="h-9" />
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-black transition"
            >
              Home
            </Link>

            <Link
              to="/image"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Generate Images
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image" element={<Image />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

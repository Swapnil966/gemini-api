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
      <div>
        <Link>
          <img src={logo} className="h-8" />
        </Link>
        <Link to="/image">Generate images</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image" element={<Image />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

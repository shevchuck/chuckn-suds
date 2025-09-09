// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import Gallery from "./Gallery.jsx";
import Flyer from "./Flyer.jsx";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect old hash URLs (e.g. #/gallery -> /gallery)
  useEffect(() => {
    if (window.location.hash && window.location.hash.startsWith("#/")) {
      const clean = window.location.hash.slice(1); // remove '#'
      navigate(clean, { replace: true });
    }
  }, [navigate]);

  // Handle GitHub Pages 404.html redirect (Step 3B)
  useEffect(() => {
    const pending = sessionStorage.redirect;
    if (pending) {
      delete sessionStorage.redirect;
      navigate(pending, { replace: true });
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/flyer" element={<Flyer />} />
      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

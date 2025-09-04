// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Gallery from "./Gallery.jsx";
import Flyer from "./Flyer.jsx"; // 👈 add this

function Root() {
  const [hash, setHash] = React.useState(window.location.hash || "#/");

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Normalize the hash into a simple path like "/flyer"
  const page = (hash.startsWith("#") ? hash.slice(1) : hash).split("?")[0] || "/";
  // Scroll to top on route change (nice for mobile)
  React.useEffect(() => window.scrollTo(0, 0), [page]);

  if (page === "/gallery") return <Gallery />;
  if (page === "/flyer") return <Flyer />;   // 👈 route for your flyer

  // default: home
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

import React, { useState } from "react";
import logo from "../assets/c.png";

export default function Header({ mode = "home", onBookNow }) {
  const [open, setOpen] = useState(false);

  const goHome = () => {
    window.location.hash = "#/";
    setOpen(false);
  };

  const goGallery = () => {
    window.location.hash = "#/gallery";
    setOpen(false);
  };

  // NEW: Flyer page nav helper
  const goFlyer = () => {
    window.location.hash = "#/flyer";
    setOpen(false);
  };

  const goSection = (selector) => {
    if (mode === "home") {
      setOpen(false);
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#/";
      setOpen(false);
      setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  };

  // Unified Book Now handler: uses onBookNow if provided, else falls back to smooth-scroll
  const handleBookNow = (e) => {
    if (onBookNow) {
      e?.preventDefault?.();
      setOpen(false);
      onBookNow(); // App will: setShowForm(true), set hash, smooth-scroll
      return;
    }
    // Fallback (works with/without hash listener)
    setOpen(false);
    if (mode === "home") {
      // normalize URL then scroll
      history.replaceState(null, "", "#contact-form");
      requestAnimationFrame(() => goSection("#contact-form"));
    } else {
      // go to home then scroll
      window.location.hash = "#/";
      setTimeout(() => {
        history.replaceState(null, "", "#contact-form");
        const el = document.querySelector("#contact-form");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo & brand */}
        <button onClick={goHome} className="flex items-center gap-3">
          <img src={logo} alt="Chuck’n Suds logo" className="h-10 w-auto drop-shadow-md" />
          <span className="hidden text-sm font-semibold tracking-wide md:block">
            Chuck’n Suds Foam Parties
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm md:flex">
          <button onClick={() => goSection("#packages")} className="hover:opacity-90">Packages</button>
          <button onClick={() => goSection("#faq")} className="hover:opacity-90">FAQ</button>
          <button onClick={() => goSection("#contact-form")} className="hover:opacity-90">Contact</button>
          <button onClick={goGallery} className="hover:opacity-90">Gallery</button>
          {/* NEW: Flyer link */}
          <button onClick={goFlyer} className="hover:opacity-90">Flyer</button>
        </nav>

        {/* Book button & Hamburger */}
        <div className="flex items-center gap-2">
          {/* Use anchor with href for graceful fallback, but intercept click */}
          <a
            href="#contact-form"
            onClick={handleBookNow}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-pink-600 shadow-lg hover:bg-white transition active:scale-95"
          >
            Book Now
          </a>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 p-2 backdrop-blur hover:bg-white/20"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-top border-white/15 bg-white/10 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm">
            <button onClick={goHome} className="rounded-lg px-3 py-2 text-left hover:bg-white/15">Home</button>
            <button onClick={() => goSection("#packages")} className="rounded-lg px-3 py-2 text-left hover:bg-white/15">Packages</button>
            <button onClick={() => goSection("#faq")} className="rounded-lg px-3 py-2 text-left hover:bg-white/15">FAQ</button>
            <button onClick={() => goSection("#contact-form")} className="rounded-lg px-3 py-2 text-left hover:bg-white/15">Contact</button>
            <button onClick={goGallery} className="rounded-lg px-3 py-2 text-left hover:bg-white/15">Gallery</button>
            {/* NEW: Flyer link */}
            <button onClick={goFlyer} className="rounded-lg px-3 py-2 text-left hover:bg-white/15">Flyer</button>
            <button
              onClick={handleBookNow}
              className="mt-2 rounded-full bg-pink-500 px-4 py-2 font-bold text-white shadow hover:bg-pink-400"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

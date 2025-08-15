// src/Gallery.jsx
import React, { useState } from "react";

export default function Gallery() {
  // Put your images in /public/gallery and list them here
  const images = [
    "/gallery/party1.jpg",
    "/gallery/party2.jpg",
    "/gallery/party3.jpg",
   
    "/gallery/party5.jpg",
    "/gallery/party6.jpg",
  ];

  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  // Smooth “Book Now”: go home then scroll to #contact
  const goBookNow = () => {
    window.location.hash = "#/";        // switch to home
    // wait a moment for App to render, then scroll to #contact
    setTimeout(() => {
      const el = document.querySelector("#contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400 text-white">
      {/* Top bar (matches home) */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/c.png" alt="Chuck’n Suds logo" className="h-10 w-auto drop-shadow-md" />
            <span className="hidden text-sm font-semibold tracking-wide md:block">
              Chuck’n Suds Foam Parties
            </span>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#packages" className="hover:opacity-90">Packages</a>
            <a href="#faq" className="hover:opacity-90">FAQ</a>
            <a href="#contact" className="hover:opacity-90">Contact</a>
            <a href="#/gallery" className="hover:opacity-90">Gallery</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-pink-600 shadow-lg hover:bg-white">
             Book Now
          </a>
        </div>
      </header>

      {/* Title */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-4">
        <h1 className="text-center text-4xl font-extrabold md:text-5xl drop-shadow-lg">Photo Gallery</h1>
        <p className="mt-3 text-center text-white/90 md:text-lg">
          Swipe or click through the fun!
        </p>
      </section>

      {/* Carousel */}
      <section className="mx-auto max-w-4xl px-4">
        <div className="relative rounded-3xl bg-white/10 ring-1 ring-white/20 p-4 backdrop-blur">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-white/30 shadow-2xl">
            <img
              src={images[i]}
              alt={`Foam party ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-4 py-2 text-pink-600 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 px-4 py-2 text-pink-600 shadow hover:bg-white"
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setI(idx)}
                className={
                  "h-2 w-2 cursor-pointer rounded-full " +
                  (idx === i ? "bg-white" : "bg-white/50")
                }
              />
            ))}
          </div>
        </div>

        {/* Book Now under carousel */}
        <div className="mt-8 flex justify-center">
          <button
                onClick={goBookNow}
                className="w-full max-w-xs rounded-full bg-white/95 px-8 py-4 text-lg font-extrabold text-pink-600 shadow-[0_4px_20px_rgba(255,255,255,0.4)] ring-2 ring-pink-300 hover:bg-white hover:scale-105 hover:shadow-[0_6px_25px_rgba(255,255,255,0.6)] transition-all duration-300"
                >
                🎉 Book Now 🎉
                </button>
        </div>
      </section>

      {/* Tiny bubbles bg (optional, match vibe) */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Bubbles />
      </div>
    </div>
  );
}

function Bubbles() {
  const dots = Array.from({ length: 36 });
  return (
    <svg className="absolute inset-0 h-full w-full" role="img" aria-label="floating bubbles">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      {dots.map((_, i) => {
        const cx = Math.random() * 100;
        const cy = Math.random() * 100;
        const r = 6 + Math.random() * 22;
        const dur = 8 + Math.random() * 10;
        const delay = Math.random() * 6;
        return (
          <g key={i} style={{ mixBlendMode: "screen" }}>
            <circle cx={`${cx}%`} cy={`${cy}%`} r={r} fill="url(#g)">
              <animate attributeName="cy" values={`${cy}%;${cy - 8}%;${cy}%`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

// src/Flyer.jsx
import React from "react";
import Header from "./components/Header.jsx";
import flyer from "./assets/flyer.png"; // <-- place your flyer file here

export default function Flyer() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400 text-white">
      <Header mode="flyer" />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* <h1 className="text-center text-3xl font-extrabold md:text-4xl">
          Event Flyer
        </h1> */}

        <div className="mt-8 flex justify-center">
          <img
            src={flyer}
            alt="Chuck’n Suds digital flyer"
            className="w-full max-w-3xl md:max-w-4xl rounded-2xl ring-1 ring-white/20 shadow-2xl"
          />
        </div>

        {/* Optional: download/open buttons */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href={flyer}
            download
            className="rounded-xl bg-white/90 px-5 py-3 text-sm font-bold text-pink-600 shadow-lg hover:bg-white"
          >
            Download Flyer
          </a>
          <a
            href={flyer}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/60 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur hover:bg-white/20"
          >
            Open in New Tab
          </a>
        </div>
      </section>
    </div>
  );
}

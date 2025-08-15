// src/Gallery.jsx
import React, { useState } from "react";
import Header from "./components/Header.jsx";

// pull in ANY jpg/png/webp from src/assets/gallery
const modules = import.meta.glob("./assets/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

// make a sorted array of image URLs
const images = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))      // sort by filename
  .map(([, mod]) => mod.default);              // get the URL

export default function Gallery() {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400 text-white">
        <Header mode="gallery" />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-3xl font-extrabold">Gallery</h1>
          <p className="mt-4 text-white/90">Add images to <code>src/assets/gallery/</code> (jpg/png/webp).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400 text-white">
      <Header mode="gallery" />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-center text-3xl font-extrabold">Gallery</h1>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/20 shadow-xl">
          <img
            src={images[i]}
            alt={`Gallery ${i + 1}`}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-pink-600 shadow hover:bg-white"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-pink-600 shadow hover:bg-white"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* dots */}
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`h-2 w-2 cursor-pointer rounded-full ${idx === i ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

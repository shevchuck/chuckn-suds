import React, { useState } from "react";
import Header from "./components/Header.jsx";
import party1 from "./assets/gallery/party1.jpg";
import party2 from "./assets/gallery/party2.jpg";
// add other imports...

export default function Gallery() {
  const images = [party1, party2 /* ... add the rest */];
  const [i, setI] = useState(0);

  const prev = () => setI((i - 1 + images.length) % images.length);
  const next = () => setI((i + 1) % images.length);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400 text-white">
      <Header mode="gallery" />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-6 text-center text-3xl font-extrabold">Gallery</h1>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/20 shadow-xl">
          <img src={images[i]} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 px-3 py-2 rounded-full">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 px-3 py-2 rounded-full">›</button>
        </div>
      </div>
    </div>
  );
}

// src/App.jsx
import React, { useState, useEffect } from "react";
import { Facebook, Instagram, PhoneCall, MessageSquare } from "lucide-react";
import Header from "./components/Header.jsx";
import logo from "./assets/c.png";
import ContactForm from "./components/ContactForm.jsx";
import webVid from "./assets/webVid.mp4"; // ✅ video import
import poster from "./assets/poster.png"; // ✅ poster import

// 👉 Add your package images to src/assets and import them here:
import dayImg from "./assets/day.jpg";
import nightImg from "./assets/night.jpg";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false); // ✅ track when video is ready

  const handleFormSuccess = () => {
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  useEffect(() => {
    const openIfHash = () => {
      if (window.location.hash === "#contact-form") {
        setShowForm(true);
        const el = document.querySelector("#contact-form");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, []);

  const packages = [
    {
      name: "DAY BUBBLE BLAST (60 min)",
      price: "$320",
      image: dayImg,
      features: [
        "1 hour foam party - Additional time add-on available",
        "Pro foam cannon + attendant",
        "Kid-safe foam concentrate",
        "Sound system & music",
        "We travel and take care of everything!",
        "Color upgrades availble for gender reveal & themed parties",
      ],
      cta: "Book Day Bubble Blast",
    },
    {
      name: "NIGHT TIME FRENZY (60 min)",
      price: "$380 ",
      image: nightImg,
      features: [
        "1 hour foam party - Additional time add-on available",
        "Pro foam cannon + attendant",
        "Kid-safe foam concentrate",
        "Sound system & music",
        "Colorful DJ Party Lights that bring your night to life",
        "We travel and take care of everything",
        "Glow foam & UV lighting upgrades available",
      ],
      cta: "Book Night Time Frenzy",
      highlight: true,
      badge: {
        text: "Most Popular",
        className:
          "absolute -top-3 right-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-extrabold tracking-wide text-white shadow-lg ring-1 ring-white/30",
      },
    },
  ];

  const faqs = [
    { q: "Is the foam safe?", a: "Yes! Our foam solution is hypoallergenic, non-staining, and biodegradable. It’s safe for skin, grass, and pets when used as directed." },
    { q: "What space and power do I need?", a: "A 15×15 ft (or larger) open area is perfect. We’ll need access to a standard outdoor outlet (110V) and a water hose spigot." },
    { q: "Do you travel?", a: "From beaches to backyards, we cover Delaware, the Eastern Shore of Maryland, Southern Pennsylvania, and Southern New Jersey. Travel further for an additional mileage fee." },
    { q: "What should guests wear?", a: "Swimwear or play clothes you don’t mind getting wet. Water shoes or bare feet are recommended." },
    { q: "What’s cleanup like?", a: "Foam breaks down quickly on its own after the party. Many hosts give the area a quick rinse later." },
    { q: "What type of surface is needed?", a: "Any medium-to-large, flat space free of obstacles works great—yards, driveways, or courts." },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400 text-white">
      <Header mode="home" />

      {/* HERO with video background + poster + fade-in */}
      <section className="relative overflow-hidden h-[80vh] min-h-[500px]">
        {/* Video */}
        <video
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlayThrough={() => setVideoLoaded(true)} // ✅ fade-in trigger
        >
          <source src={webVid} type="video/mp4" />
        </video>

        {/* Overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-black/25" />

        {/* Brand gradient overlay for consistency */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-500/20 to-teal-500/20" />

        {/* Bubble overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Bubbles />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 place-items-center gap-6 px-4 py-16 md:grid-cols-2 md:py-24">
          {/* Left: text */}
          <div className="text-center md:text-left">
            <div className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/30">
              Epic Foam Parties for All Ages!
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight drop-shadow-lg md:text-6xl">
              We Bring the <span className="whitespace-nowrap">Foam & Fun</span>
            </h1>
            <p className="mt-3 max-w-prose text-white/90 md:text-lg">
              Turn birthdays, school events, and block parties into unforgettable, bubbly adventures.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#packages"
                className="rounded-xl bg-white/90 px-5 py-3 text-sm font-bold text-pink-600 shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-white"
              >
                View Packages
              </a>
              <a
                href="#contact-form"
                onClick={() => setShowForm(true)}
                className="rounded-xl border border-white/60 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition-transform duration-200 hover:scale-105 hover:bg-white/20"
              >
                Get a Quote
              </a>
            </div>
          </div>

          {/* Right: responsive bouncing logo */}
          <div className="relative mt-6 flex items-center justify-center">
            <img
              src={logo}
              alt="Chuck’n Suds logo"
              className="h-32 md:h-48 lg:h-64 w-auto animate-bob select-none pointer-events-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        {/* Respect reduced motion */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            video { display: none; }
          }
        `}</style>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">Packages</h2>
        <p className="mt-2 text-center text-white/90">Transparent pricing. All the foam you need.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-3xl overflow-hidden ring-1 ring-white/25 backdrop-blur shadow-xl bg-white/10 ${
                pkg.highlight ? "scale-[1.02] bg-white/15" : ""
              }`}
            >
              {/* Image + badge overlay */}
              <div className="relative">
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-48 w-full object-cover object-center"
                  />
                )}
                {pkg.badge && (
                  <span className="absolute top-3 right-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-extrabold tracking-wide text-white shadow-lg ring-1 ring-white/30">
                    {pkg.badge.text}
                  </span>
                )}
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-xl font-extrabold tracking-wide">{pkg.name}</h3>
                <div className="mt-1 text-3xl font-black">{pkg.price}</div>
                <ul className="mt-4 space-y-2 text-sm/6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-300" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => setShowForm(true)}
                  className="mt-6 inline-block w-full rounded-2xl bg-white/90 px-4 py-3 text-center text-sm font-bold text-pink-600 shadow transition-transform duration-200 hover:scale-105 hover:bg-white"
                >
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-8 divide-y divide-white/20 rounded-3xl bg-white/10 ring-1 ring-white/20">
          {faqs.map((item, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-pink-300 align-middle" />
                {item.q}
              </summary>
              <p className="mt-3 text-white/90">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT FORM (toggle) */}
      <section id="contact-form" className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl">Get a Quote</h2>
        <p className="mt-2 text-white/90">Currently booking for 2026 Spring Season.</p>
        <p className="mt-2 text-white/90">Tell us about your event — we’ll reply ASAP.</p>

        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 rounded-xl bg-white/90 px-6 py-3 text-sm font-bold text-pink-600 shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-white"
          >
            Contact Us
          </button>
        )}

        <div
          className={`mt-8 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
            showForm ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {showForm && (
            <div className="text-left">
              <ContactForm onSubmitSuccess={handleFormSuccess} />
              <div className="mt-3 text-center">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-sm underline hover:opacity-90"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {submitted && (
          <div className="mt-6 inline-block rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow">
            ✅ Thanks! We’ll be in touch soon.
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/20 bg-black/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-extrabold">Book Your Party</h3>
            <p className="mt-2 text-white/90">Call or message us!</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="tel:+1-302-729-2002"
                className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-pink-600 shadow hover:bg-white transition-transform duration-200 hover:scale-105"
              >
                <PhoneCall className="h-4 w-4" /> (302) 729-2002
              </a>
              <a
                href="https://m.me/ChucknSuds"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/20 transition-transform duration-200 hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" /> Message Us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-extrabold">Service Area</h3>
            <p className="mt-2 text-white/90">
              Serving Delaware, Eastern Shore MD, Southern PA, & Southern NJ.
              Travel available for a small mileage fee.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-extrabold">Follow Us</h3>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://facebook.com/ChucknSuds"
                target="_blank"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 rounded-full bg-white/90 p-3 text-pink-600 shadow hover:bg-white transition-transform duration-200 hover:scale-105"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/ChucknSuds"
                target="_blank"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 rounded-full bg-white/90 p-3 text-pink-600 shadow hover:bg-white transition-transform duration-200 hover:scale-105"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-3 text-sm text-white/80">
              @ChucknSuds • www.chucknsuds.com
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/70">
          © {new Date().getFullYear()} Chuck’n Suds. All rights reserved.
        </div>
      </footer>

      {/* Tailwind keyframes */}
      <style>{`
        @keyframes bob { 0%,100%{transform: translateY(0)} 50%{transform: translateY(-6px)} }
        .animate-bob { animation: bob 3s ease-in-out infinite; }
        @keyframes pulseSlow { 0%,100%{opacity:.6} 50%{opacity:1} }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function Bubbles() {
  const dots = Array.from({ length: 40 });
  return (
    <svg className="absolute inset-0 h-full w-full" role="img" aria-label="floating bubbles background">
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
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={r} fill="url(#g)">
            <animate
              attributeName="cy"
              values={`${cy}%;${cy - 8}%;${cy}%`}
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </svg>
  );
}

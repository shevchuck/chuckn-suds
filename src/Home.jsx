// src/Home.jsx
import React, { useState, useEffect } from "react";
import { Facebook, Instagram, PhoneCall, MessageSquare } from "lucide-react";
import Header from "./components/Header.jsx";
import logo from "./assets/c.png";
import ContactForm from "./components/ContactForm.jsx";
import webVid from "./assets/webVid.mp4";
import NewsletterMini from "./components/NewsletterMini.jsx";

// 👉 Package images
import dayImg from "./assets/day.jpg";
import nightImg from "./assets/night.jpg";
import littleImg from "./assets/little.jpg"; // NEW
import VideoEmbed from "./components/VideoEmbed.jsx"; // NEW

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleFormSuccess = () => {
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Open the form whenever the URL hash is #contact or #contact-form
  useEffect(() => {
    const openIfHash = () => {
      const h = window.location.hash;
      if (h === "#contact" || h === "#contact-form") {
        setShowForm(true);
        requestAnimationFrame(() => {
          const el = document.querySelector("#contact-form");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          if (h !== "#contact-form") history.replaceState(null, "", "#contact-form");
        });
      }
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, []);

  const packages = [
    {
      name: "MINI BUBBLE BASH (45 min)",
      price: "$299",
      image: littleImg,
      features: [
        "45-minute foam party — perfect for younger birthdays",
        "Pro foam cannon + friendly attendant",
        "Kid-safe, hypoallergenic foam",
        "Sound system & fun party playlist",
        "We travel and take care of everything!",
        "Quick setup & tidy wrap-up",
        "Add extra time anytime!",
      ],
      cta: "Book Mini Bubble Bash",
    },
    {
      name: "DAY BUBBLE BLAST (60 min)",
      price: "$320",
      image: dayImg,
      features: [
        "1 hour foam party - Additional time add-on available",
        "Pro foam cannon + attendant",
        "Kid-safe, hypoallergenic foam",
        "Sound system & fun party playlist",
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
        "Glow Foam + UV & DJ party lights to light up the night",
        "Pro foam cannon + attendant",
        "Kid-safe, hypoallergenic foam",
        "Sound system & fun party playlist",
        "We travel and take care of everything",
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
      <Header
        mode="home"
        onBookNow={() => {
          setShowForm(true);
          history.replaceState(null, "", "#contact-form");
          requestAnimationFrame(() => {
            const el = document.querySelector("#contact-form");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }}
      />

      {/* HERO with video background (responsive height) */}
      <section className="relative overflow-hidden h-[70vh] min-h-[480px] md:h-[80vh] md:min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-pink-500 to-orange-400" />
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Bubbles />
        </div>

        <video
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoLoaded(true)}
        >
          <source src={webVid} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-500/20 to-teal-500/20" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 place-items-center gap-5 px-4 py-12 md:grid-cols-2 md:py-24">
          <div className="text-center md:text-left">
            <div className="inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-white/30 md:text-xs">
              Epic Foam Parties for All Ages!
            </div>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight drop-shadow-lg md:text-6xl">
              We Bring the <span className="whitespace-nowrap">Foam & Fun</span>
            </h1>
            <p className="mt-2 max-w-prose text-white/90 text-base md:text-lg">
              Turn birthdays, school events, and block parties into unforgettable, bubbly adventures.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#packages"
                className="rounded-xl bg-white/90 px-4 py-2.5 text-sm font-bold text-pink-600 shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-white"
              >
                View Packages
              </a>
              <a
                href="#contact-form"
                onClick={() => setShowForm(true)}
                className="rounded-xl border border-white/60 bg-white/10 px-4 py-2.5 text-sm font-bold backdrop-blur transition-transform duration-200 hover:scale-105 hover:bg-white/20"
              >
                Get a Quote
              </a>
            </div>
          </div>

          <div className="relative mt-4 flex items-center justify-center md:mt-6">
            <img
              src={logo}
              alt="Chuck’n Suds logo"
              className="h-24 md:h-48 lg:h-64 w-auto animate-bob select-none pointer-events-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

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

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`group relative overflow-hidden rounded-3xl ring-1 ring-white/25 bg-white/10 backdrop-blur
                          shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-500/30
                          ${pkg.highlight ? "bg-white/15" : ""}`}
            >
              <div className="relative">
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}

                {pkg.highlight && (
                  <span className="absolute top-3 right-3 z-10">
                    <span className="absolute inset-0 -z-10 blur-lg rounded-full bg-pink-500/70"></span>
                    <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-extrabold tracking-wide text-white shadow-lg ring-1 ring-white/30">
                      Most Popular
                    </span>
                  </span>
                )}

                <BubbleAccent />
              </div>

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
                  href="#contact-form"
                  onClick={() => setShowForm(true)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-pink-600
                             shadow transition-all duration-200 hover:scale-[1.02] hover:bg-white"
                >
                  {pkg.cta}
                  <span className="inline-block h-2 w-2 rounded-full bg-pink-500 animate-ping-slow"></span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO VIDEO (Vimeo) */}
      <section id="video" className="mx-auto max-w-4xl px-4 pt-4 pb-16">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">
          See the Foam in Action
        </h2>
        <p className="mt-2 text-center text-white/90">
          60 seconds of pure party vibes — turn your event into the BEST DAY EVER.
        </p>

        <div className="mt-6">
          <VideoEmbed vimeoId="1120820153" autoplay={false} />
        </div>
      </section>

        

      <NewsletterMini action="https://formspree.io/f/xpwlneal" />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 divide-y divide-white/15 overflow-hidden rounded-3xl ring-1 ring-white/15">
          {faqs.map((item, i) => (
            <details key={i} className="group bg-white/5 transition-colors">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-semibold">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-pink-300" />
                  {item.q}
                </span>
                <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition-all group-open:rotate-180">
                  <span className="relative block h-3 w-3">
                    <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white"></span>
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-0.5 bg-white transition-opacity group-open:opacity-0"></span>
                  </span>
                </span>
              </summary>
              <div className="px-5 pb-5">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 ring-1 ring-white/10">
                  <p className="text-white/90">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT FORM (toggle) */}
      <span id="contact" className="block -mt-4 pt-4" aria-hidden="true" />
      <section id="contact-form" className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl">Get a Quote</h2>
        <p className="mt-2 text-white/90">Currently booking for 2026 Spring Season.</p>
        <p className="mt-2 text-white/90">Tell us about your event — we’ll reply ASAP.</p>

        {!showForm && !submitted && (
          <button
            onClick={() => {
              setShowForm(true);
              history.replaceState(null, "", "#contact-form");
            }}
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

      {/* FOOTER with animated wave */}
      <footer id="footer" className="relative">
        <div className="bg-black/10">
          <WaveDividerAnimated />
        </div>

        <div className="border-t border-white/10 bg-black/10">
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
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 p-3 text-pink-600 shadow hover:bg-white transition-transform duration-200 hover:scale-105 animate-pulse-soft"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/ChucknSuds"
                  target="_blank"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 p-3 text-pink-600 shadow hover:bg-white transition-transform duration-200 hover:scale-105 animate-pulse-soft"
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
        </div>
      </footer>

      {/* Tailwind keyframes */}
      <style>{`
        @keyframes bob { 0%,100%{transform: translateY(0)} 50%{transform: translateY(-6px)} }
        .animate-bob { animation: bob 3s ease-in-out infinite; }

        @keyframes pulseSlow { 0%,100%{opacity:.6} 50%{opacity:1} }
        .animate-pulse-slow { animation: pulseSlow 2.5s ease-in-out infinite; }

        @keyframes pulseSoft { 0%,100%{transform: scale(1)} 50%{transform: scale(1.05)} }
        .animate-pulse-soft { animation: pulseSoft 2.8s ease-in-out infinite; }

        @keyframes pingSlow { 75%, 100% { transform: scale(1.6); opacity: 0; } }
        .animate-ping-slow { animation: pingSlow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }

        @keyframes waveSlide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-wave { animation: waveSlide 12s linear infinite; }
      `}</style>
    </div>
  );
}

/* ---------- Animated full-width footer wave ---------- */
function WaveDividerAnimated() {
  return (
    <div className="relative w-full h-20 md:h-24 overflow-hidden text-white/25">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 h-full w-[200%] animate-wave"
      >
        <g>
          <path
            fill="currentColor"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,69.3C672,43,768,21,864,26.7C960,32,1056,64,1152,80C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0,480,0,384,0,288,0,192,0,96,0,48,0L0,0Z"
          />
        </g>
        <g transform="translate(1440,0)">
          <path
            fill="currentColor"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,69.3C672,43,768,21,864,26.7C960,32,1056,64,1152,80C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0,768,0,672,0,576,0,480,0,384,0,288,0,192,0,96,0,48,0L0,0Z"
          />
        </g>
      </svg>
    </div>
  );
}

/* ---------- Tiny visual helpers ---------- */
function BubbleAccent() {
  return (
    <div className="pointer-events-none absolute -top-3 -right-3 flex gap-1 opacity-70">
      <span className="h-3 w-3 rounded-full bg-white/70"></span>
      <span className="h-2 w-2 rounded-full bg-white/50 mt-2"></span>
      <span className="h-1.5 w-1.5 rounded-full bg-white/40 mt-3"></span>
    </div>
  );
}

/* ---------- Background bubbles ---------- */
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

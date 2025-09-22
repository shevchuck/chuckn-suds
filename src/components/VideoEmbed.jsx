// src/components/VideoEmbed.jsx
import { useMemo, useState } from "react";

/**
 * Lite Vimeo Embed
 * - Loads only a lightweight thumbnail + branded play overlay at first
 * - Injects the real Vimeo iframe *after* the user clicks play
 * - Great for Lighthouse/PageSpeed performance
 */
export default function VideoEmbed({
  vimeoId,
  title = "Chuck’n Suds Promo",
  // set to true if you want autoplay (muted) immediately after click
  autoplayOnClick = true,
}) {
  const [showPlayer, setShowPlayer] = useState(false);

  // Free thumbnail service for Vimeo (fast + cacheable)
  const thumbUrl = useMemo(() => `https://vumbnail.com/${vimeoId}.jpg`, [vimeoId]);

  // Build iframe src only when needed (after click)
  const iframeSrc = useMemo(() => {
    if (!showPlayer) return "";
    const params = new URLSearchParams({
      autoplay: autoplayOnClick ? "1" : "0",
      muted: autoplayOnClick ? "0" : "0",
      playsinline: "1",
      loop: "0",
      byline: "0",
      title: "0",
      portrait: "0",
      dnt: "1",
    });
    return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
  }, [showPlayer, vimeoId, autoplayOnClick]);

  const handlePlay = () => setShowPlayer(true);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20 bg-black/20">
      {/* 1) Thumbnail layer (only when player hasn't been created yet) */}
      {!showPlayer && (
        <img
          src={thumbUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          loading="lazy"
        />
      )}

      {/* 2) Real Vimeo player (only mounts after click) */}
      {showPlayer && (
        <iframe
          src={iframeSrc}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          loading="lazy"
        />
      )}

      {/* 3) Branded play overlay (only before click) */}
      {!showPlayer && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition"
        >
          <div
            className="
              relative flex items-center justify-center
              h-16 w-16 md:h-24 md:w-24
              rounded-full bg-gradient-to-br from-teal-400 to-pink-500
              shadow-lg ring-4 ring-white/40 hover:scale-105 transition-transform
            "
          >
            {/* Color-shifting bubbly glow behind the button */}
            <span className="pointer-events-none absolute inset-0 rounded-full blur-2xl opacity-80 animate-bubbleGlow" />

            {/* Play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="relative w-8 h-8 md:w-12 md:h-12 drop-shadow"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* 4) Noscript fallback */}
      <noscript>
        <a
          href={`https://vimeo.com/${vimeoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Watch on Vimeo
        </a>
      </noscript>

      {/* Local keyframes for the glow */}
      <style>{`
        @keyframes bubbleGlow {
          0%, 100% {
            background: radial-gradient(circle, rgba(45,212,191,0.85), transparent 70%);
          }
          50% {
            background: radial-gradient(circle, rgba(236,72,153,0.85), transparent 70%);
          }
        }
        .animate-bubbleGlow { animation: bubbleGlow 3s ease-in-out infinite; }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-bubbleGlow { animation: none; }
        }
      `}</style>
    </div>
  );
}

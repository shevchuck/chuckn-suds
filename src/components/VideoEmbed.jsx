
import { useEffect, useRef, useState } from "react";


export default function VideoEmbed({
  vimeoId,
  title = "Chuck’n Suds Promo",
  autoplay = false,
}) {
  const ref = useRef(null);
  const [src, setSrc] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const params = new URLSearchParams({
          autoplay: autoplay ? "1" : "0",
          muted: autoplay ? "1" : "0",
          playsinline: "1",
          loop: "0",
          byline: "0",
          title: "0",
          portrait: "0",
          dnt: "1",
        });
        setSrc(`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`);
        io.disconnect();
      }
    }, { rootMargin: "200px" });

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [vimeoId, autoplay]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/20 bg-black/20"
    >
      {src ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-white/10" />
      )}
    </div>
  );
}

// src/components/NewsletterMini.jsx
import { useState } from "react";

/**
 * Signup strip: "Join the Foam Club for early access + discounts."
 * Connected to Formspree (or replace action with Mailchimp, Buttondown, etc.)
 */
export default function NewsletterMini({
  action = "https://formspree.io/f/xpwlneal", // ← replace if needed
}) {
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      setStatus("loading");
      const res = await fetch(action, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setStatus("ok");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 pb-6">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur ring-1 ring-white/20 md:flex-row md:justify-between md:gap-6"
      >
        {/* Left text */}
        <p className="text-base font-semibold text-center md:text-left md:text-lg">
          Join the <span className="text-teal-200">Foam Club</span> for{" "}
          <span className="text-pink-200">early access</span> +{" "}
          <span className="text-pink-200">discounts</span>.
        </p>

        {/* Input + button */}
        <div className="flex w-full gap-2 md:w-auto">
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full md:w-72 rounded-xl bg-white/90 px-3 py-2 text-black placeholder-black/60 shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label="Email address"
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "ok"}
            className="shrink-0 rounded-xl bg-pink-500 px-4 py-2 font-bold text-white shadow hover:bg-pink-400 active:scale-95 disabled:opacity-60"
          >
            {status === "ok" ? "Thanks!" : status === "loading" ? "…" : "Join"}
          </button>
        </div>
      </form>
    </section>
  );
}

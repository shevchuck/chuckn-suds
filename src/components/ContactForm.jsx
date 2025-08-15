// src/components/ContactForm.jsx
import React from "react";

export default function ContactForm({ onSubmitSuccess }) {
  const endpoint = "https://formspree.io/f/xpwlneal"; // <-- put your real Formspree URL here

  // If parent gave us a success handler, use JS fetch to submit.
  // Otherwise fall back to normal HTML form submission (works even with JS disabled).
  async function handleSubmit(e) {
    if (!onSubmitSuccess) return; // let browser do a normal POST/redirect

    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        onSubmitSuccess?.();
      } else {
        // Optional: show an inline error
        alert("Hmm, something went wrong sending your message. Please try again or email hello@chucknsuds.com.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  }

  return (
    <form
      action={endpoint}
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4 bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur ring-1 ring-white/20"
    >
      {/* Honeypot to reduce spam (hidden) */}
      <input type="text" name="company" className="hidden" tabIndex="-1" autoComplete="off" />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg p-3 bg-white/90 text-black placeholder-gray-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg p-3 bg-white/90 text-black placeholder-gray-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Phone (optional)</label>
        <input
          type="tel"
          name="phone"
          className="w-full rounded-lg p-3 bg-white/90 text-black placeholder-gray-500"
          placeholder="(555) 555-5555"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Message</label>
        <textarea
          name="message"
          rows="4"
          required
          className="w-full rounded-lg p-3 bg-white/90 text-black placeholder-gray-500"
          placeholder="Tell us about your event!"
        />
      </div>

      <div className="flex items-center gap-2 text-sm">
        <input id="consent" type="checkbox" required className="h-4 w-4" />
        <label htmlFor="consent">I agree to be contacted about my inquiry.</label>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-pink-500 px-5 py-3 text-white font-bold shadow-lg hover:bg-pink-600 transition"
      >
        Send
      </button>
    </form>
  );
}

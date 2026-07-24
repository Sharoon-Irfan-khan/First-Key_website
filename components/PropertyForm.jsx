"use client";

import { useState } from "react";
import { Arrow } from "./icons";

export default function PropertyForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/list-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="form" role="status">
        <h3 style={{ fontSize: "1.7rem" }}>Thank you — your property is with us.</h3>
        <p style={{ marginTop: "14px" }}>
          A First Key broker will review your details and contact you shortly to
          discuss valuation, marketing, and next steps. For anything urgent, call{" "}
          <a href="tel:+971545011151" style={{ color: "var(--blue)" }}>
            +971 54 501 1151
          </a>
          .
        </p>
        <button
          className="btn btn--ghost"
          style={{ marginTop: "24px" }}
          onClick={() => setSent(false)}
        >
          Submit another property
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" />
        </div>
        <div className="field-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required placeholder="+971 …" />
        </div>
      </div>
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" />
        </div>
        <div className="field-group">
          <label htmlFor="propertyType">Property type</label>
          <select id="propertyType" name="propertyType" defaultValue="Apartment">
            <option>Apartment</option>
            <option>Villa</option>
            <option>Townhouse</option>
            <option>Penthouse</option>
            <option>Commercial</option>
            <option>Plot / Land</option>
          </select>
        </div>
      </div>
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="location">Location / community</label>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="e.g. Dubai Marina, Business Bay"
          />
        </div>
        <div className="field-group">
          <label htmlFor="purpose">I want to</label>
          <select id="purpose" name="purpose" defaultValue="Sell">
            <option>Sell</option>
            <option>Rent out</option>
          </select>
        </div>
      </div>
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="bedrooms">Bedrooms</label>
          <select id="bedrooms" name="bedrooms" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            <option>Studio</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
            <option>N/A</option>
          </select>
        </div>
        <div className="field-group">
          <label htmlFor="size">Size (sq ft)</label>
          <input id="size" name="size" type="text" placeholder="e.g. 1,200" />
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="price">Asking price (AED)</label>
        <input id="price" name="price" type="text" placeholder="e.g. 1,800,000" />
      </div>
      <div className="field-group">
        <label htmlFor="notes">Anything else we should know?</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Condition, view, furnishing, availability, or any other details…"
        />
      </div>
      {error && <p className="form__error">{error}</p>}
      <button type="submit" className="btn btn--primary" disabled={busy}>
        {busy ? "Sending…" : "Submit property"} <Arrow />
      </button>
      <p className="form__note">
        Your details go straight to our listings team — we'll be in touch to
        discuss valuation and next steps.
      </p>
    </form>
  );
}

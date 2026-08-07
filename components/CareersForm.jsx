"use client";

import { useState } from "react";
import { Arrow } from "./icons";

export default function CareersForm() {
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
      const res = await fetch("/api/careers", {
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
        <h3 style={{ fontSize: "1.7rem" }}>Thank you — application received.</h3>
        <p style={{ marginTop: "14px" }}>
          Our team will review your details and reach out if there's a strong
          fit. To attach your CV, email it to{" "}
          <a href="mailto:info@firstkeyint.com" style={{ color: "var(--blue)" }}>
            info@firstkeyint.com
          </a>
          .
        </p>
        <button
          className="btn btn--ghost"
          style={{ marginTop: "24px" }}
          onClick={() => setSent(false)}
        >
          Submit another application
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
          <input id="phone" name="phone" type="tel" placeholder="+971 …" />
        </div>
      </div>
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" />
        </div>
        <div className="field-group">
          <label htmlFor="role">Role of interest</label>
          <select id="role" name="role" defaultValue="Real Estate Broker">
            <option>Real Estate Broker</option>
            <option>Senior Property Consultant</option>
            <option>Sales / Leasing Agent</option>
            <option>Marketing</option>
            <option>Administration</option>
            <option>Open application</option>
          </select>
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="message">Tell us about yourself</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your experience, what you're looking for, and why First Key…"
        />
      </div>
      {error && <p className="form__error">{error}</p>}
      <button type="submit" className="btn btn--primary" disabled={busy}>
        {busy ? "Sending…" : "Submit application"} <Arrow />
      </button>
      <p className="form__note">
        Prefer email? Send your CV to{" "}
        <a href="mailto:info@firstkeyint.com" style={{ color: "var(--blue)" }}>
          info@firstkeyint.com
        </a>
        .
      </p>
    </form>
  );
}

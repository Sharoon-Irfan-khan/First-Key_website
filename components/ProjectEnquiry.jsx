"use client";

import { useState } from "react";
import { Arrow, WhatsApp } from "./icons";

export default function ProjectEnquiry({ project, developer }) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const waText = encodeURIComponent(
    `Hello First Key, I'm interested in the ${project} project. Could you share more information?`
  );

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
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

  return (
    <section className="section enquiry">
      <div className="container enquiry__grid">
        <div>
          <h2 className="h2">Interested in {project}?</h2>
          <p className="lead" style={{ marginTop: "20px" }}>
            Talk to a First Key consultant. Message us on WhatsApp for the
            fastest reply, or send the form and we&apos;ll get back within one
            business day — either way, we&apos;ll know you&apos;re asking about{" "}
            <strong>{project}</strong>.
          </p>
          <a
            href={`https://wa.me/971545011151?text=${waText}`}
            className="btn btn--whatsapp"
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: "32px" }}
          >
            <WhatsApp /> Chat on WhatsApp
          </a>
        </div>

        <div className="form">
          {sent ? (
            <div role="status">
              <h3 style={{ fontSize: "1.6rem" }}>Thank you — enquiry received.</h3>
              <p style={{ marginTop: "12px" }}>
                A First Key broker will reply within one business day about{" "}
                {project}.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <span className="eyebrow" style={{ marginBottom: "22px" }}>
                Enquire about this project
              </span>
              {/* Tells the broker which project page the enquiry came from. */}
              <input
                type="hidden"
                name="interest"
                value={`${project}${developer ? ` — ${developer}` : ""}`}
              />
              <div className="form__row">
                <div className="field-group">
                  <label htmlFor="pe-name">Full name</label>
                  <input id="pe-name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className="field-group">
                  <label htmlFor="pe-phone">Phone</label>
                  <input id="pe-phone" name="phone" type="tel" required placeholder="+971 …" />
                </div>
              </div>
              <div className="field-group">
                <label htmlFor="pe-email">Email</label>
                <input id="pe-email" name="email" type="email" required placeholder="you@email.com" />
              </div>
              <div className="field-group">
                <label htmlFor="pe-msg">Message</label>
                <textarea
                  id="pe-msg"
                  name="message"
                  defaultValue={`Hello, I'm interested in the ${project} project. Could you please provide me with more information?`}
                />
              </div>
              {error && <p className="form__error">{error}</p>}
              <button type="submit" className="btn btn--primary" disabled={busy}>
                {busy ? "Sending…" : "Send enquiry"} <Arrow />
              </button>
              <p className="form__note">We reply within one business day.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./icons";
import { corporateServiceTitles } from "@/lib/corporateServices";

export default function CorporateEnquiryForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [service, setService] = useState("");

  // Each service card's button is a plain "#enquiry" link carrying
  // data-service, so it still scrolls here without JS. With JS, it also
  // preselects that service in the dropdown.
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.("a[data-service]");
      if (!link) return;
      const picked = link.getAttribute("data-service");
      if (corporateServiceTitles.includes(picked)) {
        setSent(false);
        setService(picked);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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

  if (sent) {
    return (
      <div className="form" role="status">
        <h3 style={{ fontSize: "1.7rem" }}>Thank you — enquiry received.</h3>
        <p style={{ marginTop: "14px" }}>
          The First Key Corporate Services team will review your requirements
          and reply with clear next steps
          {service ? (
            <>
              {" "}
              on <strong>{service}</strong>
            </>
          ) : null}
          .
        </p>
        <button
          className="btn btn--ghost"
          style={{ marginTop: "24px" }}
          onClick={() => setSent(false)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {/* Tells the API to route and label this as a Corporate Services lead. */}
      <input type="hidden" name="source" value="corporate-services" />
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="cs-name">Full name</label>
          <input
            id="cs-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </div>
        <div className="field-group">
          <label htmlFor="cs-email">Email address</label>
          <input
            id="cs-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="form__row">
        <div className="field-group">
          <label htmlFor="cs-phone">Phone number</label>
          <input
            id="cs-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+971 …"
          />
        </div>
        <div className="field-group">
          <label htmlFor="cs-service">Service required</label>
          <select
            id="cs-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="" disabled>
              Select a service
            </option>
            {corporateServiceTitles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="cs-message">Message</label>
        <textarea
          id="cs-message"
          name="message"
          placeholder="Tell us briefly about your business and what you need support with…"
        />
      </div>
      {error && <p className="form__error">{error}</p>}
      <button type="submit" className="btn btn--primary" disabled={busy}>
        {busy ? "Sending…" : "Submit Enquiry"} <Arrow />
      </button>
      <p className="form__note">
        Your enquiry goes to First Key Corporate Services DWC-LLC.
      </p>
    </form>
  );
}

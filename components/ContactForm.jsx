"use client";

import { useState } from "react";
import { Arrow } from "./icons";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    // No backend wired yet — swap for your endpoint / CRM.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form" role="status">
        <h3 style={{ fontSize: "1.7rem" }}>Thank you — message received.</h3>
        <p style={{ marginTop: "14px" }}>
          A First Key broker will reply with clear next steps and the right
          options for you. For anything urgent, call us on{" "}
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
          Send another message
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
          <label htmlFor="interest">I'm interested in</label>
          <select id="interest" name="interest" defaultValue="Buying">
            <option>Buying</option>
            <option>Selling</option>
            <option>Leasing</option>
            <option>Commercial</option>
            <option>Off-Plan</option>
          </select>
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="message">What are you searching for?</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your goals, budget, and preferred communities…"
        />
      </div>
      <button type="submit" className="btn btn--primary">
        Send message <Arrow />
      </button>
      <p className="form__note">
        A First Key broker will reply with clear next steps and the right
        options for you.
      </p>
    </form>
  );
}

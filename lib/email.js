import nodemailer from "nodemailer";
import { Resend } from "resend";

// Central place for outbound transactional email (form submissions).
//
// Two delivery methods are supported. The first one that's configured wins:
//
//   1. SMTP (recommended — uses your existing firstkeyint.com mailbox).
//      Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in the environment.
//      Example (Google Workspace): host smtp.gmail.com, port 587,
//      user info@firstkeyint.com, pass = a 16-char Google "App Password".
//
//   2. Resend API (https://resend.com) as a fallback. Set RESEND_API_KEY.
//
// If neither is configured the forms still work in the browser and show the
// thank-you state, but nothing is delivered — sendMail() reports this
// ({ skipped: true }) so the API route can respond gracefully rather than crash.

const FROM =
  process.env.EMAIL_FROM ||
  process.env.SMTP_FROM ||
  process.env.SMTP_USER ||
  "First Key International <noreply@firstkeyint.com>";

// A _TO value may list several addresses separated by commas.
function recipients(to) {
  return String(to)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Where each kind of submission is routed. Overridable via env so the
// addresses can change without a code deploy.
export const INBOXES = {
  listing: process.env.LISTINGS_TO || "vishal@firstkeyint.com",
  careers: process.env.CAREERS_TO || "careers@firstkeyint.com",
  contact: process.env.CONTACT_TO || "info@firstkeyint.com",
};

// Render a plain object of { Label: value } into a simple, email-safe HTML table.
function detailsTable(fields) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#5b6b7a;font:600 13px/1.4 Arial,sans-serif;vertical-align:top;white-space:nowrap;">${escapeHtml(
            label
          )}</td>
          <td style="padding:8px 0;color:#0d1b2a;font:400 15px/1.5 Arial,sans-serif;">${escapeHtml(
            String(value)
          ).replace(/\n/g, "<br/>")}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="background:#f4f7fa;padding:32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e3e9f0;">
        <tr>
          <td style="background:#0d1b2a;padding:24px 28px;">
            <span style="color:#ffffff;font:700 18px/1.2 Arial,sans-serif;">First Key International</span>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
          </td>
        </tr>
      </table>
    </div>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Send a formatted submission email.
 * @param {Object} opts
 * @param {string} opts.to        Destination inbox.
 * @param {string} opts.subject   Email subject line.
 * @param {string} [opts.replyTo] Visitor's email so a reply goes straight to them.
 * @param {Object} opts.fields    { Label: value } pairs shown in the email body.
 * @returns {Promise<{ delivered: boolean, skipped?: boolean, error?: string }>}
 */
export async function sendMail({ to, subject, replyTo, fields }) {
  const html = detailsTable(fields);
  const toList = recipients(to);

  // Method 1 — SMTP via your own mailbox (preferred).
  if (process.env.SMTP_HOST) {
    try {
      const port = Number(process.env.SMTP_PORT) || 587;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        // Port 465 uses implicit TLS; 587/25 use STARTTLS.
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      const info = await transporter.sendMail({
        from: FROM,
        to: toList,
        subject,
        replyTo: replyTo || undefined,
        html,
      });
      // The SMTP server can accept the message for some recipients and reject
      // others — treat a fully rejected send as a failure rather than success.
      if (info.accepted?.length === 0) {
        console.error("[email] SMTP rejected all recipients", {
          to: toList,
          rejected: info.rejected,
          response: info.response,
        });
        return { delivered: false, error: `All recipients rejected: ${info.response}` };
      }
      if (info.rejected?.length) {
        console.error("[email] SMTP rejected some recipients", {
          rejected: info.rejected,
        });
      }
      return { delivered: true };
    } catch (err) {
      console.error("[email] SMTP send failed", {
        to: toList,
        subject,
        code: err.code,
        message: err.message,
      });
      return { delivered: false, error: err.message || String(err) };
    }
  }

  // Method 2 — Resend API fallback.
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: FROM,
        to: toList,
        subject,
        replyTo: replyTo || undefined,
        html,
      });
      if (error) {
        console.error("[email] Resend rejected the message", { to: toList, error });
        return { delivered: false, error: error.message || String(error) };
      }
      return { delivered: true };
    } catch (err) {
      console.error("[email] Resend send failed", {
        to: toList,
        subject,
        message: err.message,
      });
      return { delivered: false, error: err.message || String(err) };
    }
  }

  // Nothing configured yet.
  console.error(
    "[email] No delivery method configured — set SMTP_HOST (+ SMTP_USER/SMTP_PASS) " +
      "or RESEND_API_KEY. Submission was NOT delivered.",
    { to: toList, subject }
  );
  return { delivered: false, skipped: true };
}

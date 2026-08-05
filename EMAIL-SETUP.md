# Email setup — current state

## The original problem

On 2026-07-28 the contact form was reported as "not working". The cause was not
the website: **`firstkeyint.com` had no MX records**, so no address at that
domain could receive mail. `info@firstkeyint.com` did not exist as a mailbox.

Submissions were being sent successfully by Gmail and then discarded, because the
fallback A records were Vercel's web servers, which run no SMTP listener.

This was invisible for days because the API routes reported success even when
nothing was delivered, so visitors saw a thank-you message either way.

## How mail works here

Two separate halves — only the second was ever broken:

- **Sending** — the app authenticates to `smtp.gmail.com:587` as
  `get.muhammad5@gmail.com` and sends the notification. This has always worked.
- **Receiving** — the destination address must belong to a real mailbox, on a
  domain with MX records pointing at that mailbox host.

## Current configuration

Mail for `firstkeyint.com` is hosted on **Hostinger Free Business Email**. The
mailbox already existed in hPanel but was unusable because DNS for the domain is
managed by Vercel (`ns1.vercel-dns.com`), so Hostinger could not publish its own
records. Hostinger's panel showed "Email is not working / MX records are missing".

These records were added to Vercel DNS on 2026-07-28:

| Type | Name     | Value                                        |
| ---- | -------- | -------------------------------------------- |
| MX   | @        | `mx1.hostinger.com` (priority 5)              |
| MX   | @        | `mx2.hostinger.com` (priority 10)             |
| TXT  | @        | `v=spf1 include:_spf.mail.hostinger.com ~all` |
| TXT  | `_dmarc` | `v=DMARC1; p=none`                            |

The website's `ALIAS` and `CAA` records were not touched.

Form routing (Vercel production environment variables):

| Variable      | Value                  |
| ------------- | ---------------------- |
| `CONTACT_TO`  | `info@firstkeyint.com` |
| `CAREERS_TO`  | `info@firstkeyint.com` |
| `LISTINGS_TO` | `info@firstkeyint.com` |

All three point at the same mailbox because the free Hostinger plan includes one
account. If more mailboxes are added later, split these back out to `careers@`
and `vishal@`.

## Verified

- `nslookup -type=MX firstkeyint.com 8.8.8.8` returns both Hostinger hosts.
- `POST https://firstkeyint.com/api/contact` returns `200 {"ok":true}`, which
  means SMTP accepted the message for `info@firstkeyint.com`. An unset or empty
  `CONTACT_TO` would have returned 502, so this also confirms the env var.

- **Inbox delivery confirmed on 2026-07-28.** A test submission posted to the
  live endpoint arrived in the recipient's inbox, closing the last unverified
  link in the chain: form → API → SMTP → MX → mailbox.

## Broken again by the Vercel account migration (2026-08-05)

Moving the site to the `sharoonirfan09` Vercel account on 2026-07-31 created a
**new project**, and environment variables do not travel with a project move.
The old project under `muhammad-alis-projects` still holds them; the live one
started with none. Every form returned 502 from 2026-07-31 until this was found.

No leads were lost — runtime logs show the only `/api/*` request in those five
days was the test that uncovered it.

Symptoms in order, each one a step further along:

| Log line | Meaning |
| -------- | ------- |
| `No delivery method configured` | `SMTP_HOST` unset — nothing to send with |
| `SMTP send failed … EAUTH … 535-5.7.8` | credentials set but Gmail rejected them |

**Both fixes need a redeploy.** Vercel captures environment variables at build
time, so editing a variable changes nothing until a new deployment goes out.
Editing `SMTP_PASS` and re-testing against the old deployment will keep showing
the old error and looks like the fix failed.

The `EAUTH` half was a dead app password, not a typo: the value in `.env.local`
was rejected when tested straight against `smtp.gmail.com` from a laptop, with
and without its spaces. Generating a fresh app password fixed it. If this
recurs, test the credential outside Vercel first — it separates a bad secret
from a bad deployment in one step.

**Resolved 2026-08-05.** After a new app password and a redeploy, all three
endpoints return `200 {"ok":true}`: `/api/contact`, `/api/careers`,
`/api/list-property`. SMTP acceptance is not the same as inbox delivery, though
— see below.

## Unverified: does `info@firstkeyint.com` still receive?

A `200` means Gmail accepted the message for relay — no more. On 2026-08-05 the
mailbox could not be found in hPanel: the Emails page showed only a purchase
screen under both `sharoondigital@gmail.com` (which owns the domain) and
`get.muhammad5@gmail.com`. The MX records still point at Hostinger, so mail is
being accepted somewhere, but the mailbox itself was never confirmed.

If it no longer exists, Gmail bounces the message back to
`get.muhammad5@gmail.com` a few minutes later, and every lead is lost while the
visitor sees a thank-you. Confirm by opening the `info@` inbox, or by watching
that Gmail account for a delivery-failure notice.

## Remaining work

1. **DKIM** — not yet added. Hostinger generates a per-domain record shown in
   hPanel under the domain's email DNS settings. Without it, mail sent *from*
   `@firstkeyint.com` is more likely to be marked as spam. It does not affect
   *receiving*, so it is not urgent.
2. **Optional — send from the domain.** Outbound mail still authenticates as a
   personal Gmail, so notifications arrive from `get.muhammad5@gmail.com`. To
   change this, point `SMTP_HOST` at Hostinger's outgoing server with the
   `info@` credentials and set
   `SMTP_FROM="First Key International <info@firstkeyint.com>"`.

## Code changes made alongside this

- `lib/email.js` — every failure path now logs to the Vercel runtime logs, and a
  send whose recipients are all rejected is treated as a failure, not a success.
- `app/api/{contact,careers,list-property}/route.js` — an undelivered message now
  returns an error. Previously a `skipped` send returned `{ok: true}`, showing the
  visitor a thank-you while the lead was lost silently.
- `components/ProjectEnquiry.jsx` — the enquiry form on project pages never
  submitted anywhere. Its `onSubmit` only set local state and its inputs had no
  `name` attributes, so every project enquiry was discarded in the browser. It
  now posts to `/api/contact` with a hidden field identifying the project.

## Operational note

`SMTP_PASS` is a Gmail app password tied to `get.muhammad5@gmail.com`. It lives
only in `.env.local` (gitignored) and in Vercel's encrypted environment
variables. If that account's 2-Step Verification is disabled or the app password
is revoked, all forms stop delivering — the runtime logs will show
`[email] SMTP send failed`.

Two CLI gotchas when changing these variables:

- `vercel env pull` returns empty values for them because they are stored as
  sensitive. That is a read-back limitation, not a sign they are unset — verify
  by testing the live endpoint instead.
- `vercel env add --force` reports success but does not always overwrite. Use
  `vercel env rm <NAME> production --yes` followed by `vercel env add`, and check
  that the age column in `vercel env ls production` actually resets.

Environment changes only take effect on a new deployment — always run
`vercel --prod` afterwards.

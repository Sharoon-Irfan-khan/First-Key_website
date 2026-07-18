# First Key International Real Estate

Marketing website for First Key International Real Estate — a Dubai property
brokerage. Built with **Next.js (App Router)**.

Six pages: **Home, About, Properties, Developers, Media Center, Contact**.
The Developers page follows the ERE-style stacked banner-card layout the client
requested, re-skinned in the First Key brand and listing all major Dubai
developers.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build for production

```bash
npm run build
npm start
```

Deploys to Vercel with zero config (or any Node host).

## Brand

- **Primary blue:** `#0456AA` (sampled from the FK logo)
- **Deep navy:** `#041E3D` (hero washes, footer)
- **Type:** Cormorant Garamond (display) + Inter (body)
- **Signature device:** the "key mark" (`components/KeyMark.jsx`), a small key
  drawn from the FK monogram, used in eyebrows, list bullets and dividers.

Logo assets were generated from `FKI LOGO.pdf` into
`public/images/` (`logo-white`, `logo-blue`, `emblem-white`, `emblem-blue`).
The favicon is `app/icon.png`.

## Where to edit content

| Content | File |
|---|---|
| Developers list (name, tagline, price, projects) | `lib/developers.js` |
| Property listings | `lib/properties.js` |
| Page copy | `app/<page>/page.jsx` |
| Nav / header | `components/Header.jsx` |
| Footer, contact details | `components/Footer.jsx` |
| Global styles / design tokens | `app/globals.css` |

## To finish before launch

- **Contact form** (`components/ContactForm.jsx`) currently shows a success
  message on submit but does not send anywhere. Wire `onSubmit` to your email
  service / CRM (e.g. a Next.js route handler, Formspree, or HubSpot).
- **Property listings** in `lib/properties.js` are representative samples —
  replace with real inventory (and real photos in `public/images/`).
- **Developer "View projects"** links point to `/contact`; point them to real
  project pages when those exist.
- **Map** on the Contact page is a standard Google Maps embed centred on Dubai;
  update the `q=` in the iframe `src` to the exact office address.
- Replace social links in the footer with real profiles.

## Image credits

Dubai photography is from Unsplash (free to use, no attribution required).
The FK logo and brand marks are the client's own.

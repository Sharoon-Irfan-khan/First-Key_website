import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://firstkeyint.com"),
  title: {
    default: "First Key International Real Estate — Real Estate Brokers in Dubai",
    template: "%s | First Key International Real Estate",
  },
  description:
    "First Key International Real Estate helps you buy, sell, and lease property across Dubai and the wider UAE. Local brokers who deliver clarity at every step.",
  openGraph: {
    title: "First Key International Real Estate",
    description:
      "Real estate brokers in Dubai who deliver. Buy, sell, and lease across Dubai and the UAE.",
    type: "website",
    locale: "en_AE",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#041e3d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

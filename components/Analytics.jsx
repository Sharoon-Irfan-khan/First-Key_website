import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

// Both tags are optional and driven by env vars, so a local or preview build
// with no IDs set ships no tracking scripts at all.
//
// If you run GA4 *through* GTM (the usual setup), only set the GTM id — adding
// the GA id as well would double-count every pageview.
export default function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </>
  );
}

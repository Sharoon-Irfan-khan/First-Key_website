import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isConfigured } from "@/lib/sanity/config";
import SetupNotice from "./SetupNotice";

export const dynamic = "force-static";
export const metadata = {
  title: "First Key Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  // Without a project id the Studio cannot boot, so explain how to finish setup
  // rather than showing a stack trace.
  if (!isConfigured) return <SetupNotice />;
  return <NextStudio config={config} />;
}

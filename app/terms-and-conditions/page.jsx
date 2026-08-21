import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "The terms and conditions governing use of the First Key International Real Estate website and services.",
};

export default function TermsAndConditions() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-d.jpg"
        eyebrow="Legal"
        title="Terms and Conditions"
        sub="Last updated 19 August 2026"
      />

      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <div className="prose">
              <p>
                These terms and conditions ("Terms") govern your use of the
                First Key International Real Estate website (the "Site") and
                the brokerage services we provide. By using the Site or
                engaging our services, you agree to these Terms.
              </p>

              <h3>Our services</h3>
              <p>
                First Key International Real Estate is a licensed brokerage
                operating in Dubai, connecting buyers, sellers, landlords, and
                tenants with property opportunities across Dubai and the wider
                UAE. Property listings, prices, payment plans, and handover
                dates shown on the Site are provided for guidance and are
                subject to change, availability, and confirmation by the
                relevant developer or seller.
              </p>

              <h3>Use of the Site</h3>
              <p>
                You agree to use the Site only for lawful purposes and not to
                misuse it — including attempting unauthorized access, scraping
                content at scale, or submitting false information through our
                forms. We may suspend or restrict access where we reasonably
                believe these Terms have been breached.
              </p>

              <h3>No investment or legal advice</h3>
              <p>
                Content on the Site, including articles, market commentary, and
                ROI or pricing examples, is provided for general information
                only and does not constitute financial, legal, or investment
                advice. You should seek independent professional advice before
                making a property decision.
              </p>

              <h3>Intellectual property</h3>
              <p>
                The Site's design, text, images, and branding are owned by
                First Key International Real Estate or used under license, and
                may not be reproduced or distributed without our written
                permission.
              </p>

              <h3>Third-party links and content</h3>
              <p>
                The Site may reference or link to developers, partners, or
                third-party services. We are not responsible for the content,
                accuracy, or availability of those third parties.
              </p>

              <h3>Limitation of liability</h3>
              <p>
                To the fullest extent permitted by law, First Key International
                Real Estate is not liable for any indirect or consequential
                loss arising from your use of the Site or reliance on
                information published on it.
              </p>

              <h3>Governing law</h3>
              <p>
                These Terms are governed by the laws of the Emirate of Dubai
                and the applicable federal laws of the United Arab Emirates.
              </p>

              <h3>Contact us</h3>
              <p>
                Questions about these Terms can be sent to{" "}
                <a href="mailto:info@firstkeyint.com">info@firstkeyint.com</a>{" "}
                or Office 25-21, The Exchange Tower, Business Bay, Dubai.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

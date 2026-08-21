import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How First Key International Real Estate collects, uses, and protects your personal information.",
};

export default function Privacy() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-b.jpg"
        eyebrow="Legal"
        title="Privacy Policy"
        sub="Last updated 19 August 2026"
      />

      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <div className="prose">
              <p>
                First Key International Real Estate ("First Key", "we", "us", or
                "our") respects your privacy and is committed to protecting the
                personal information you share with us. This policy explains what
                we collect, why we collect it, and the choices you have.
              </p>

              <h3>Information we collect</h3>
              <p>
                We collect information you provide directly — such as your name,
                phone number, email address, and property preferences — when you
                submit an enquiry, request a valuation, list a property, apply for
                a role, or otherwise contact us through our website or offices. We
                also collect limited technical information automatically, such as
                your IP address, browser type, and pages visited, through cookies
                and analytics tools like Google Analytics and Google Tag Manager.
              </p>

              <h3>How we use your information</h3>
              <p>
                We use your information to respond to enquiries, arrange
                viewings, match you with suitable properties or buyers, process
                job applications, and communicate updates relevant to your
                request. We may also use aggregated, non-identifying data to
                understand how visitors use our site and improve it.
              </p>

              <h3>Sharing your information</h3>
              <p>
                We do not sell your personal information. We may share it with
                developers, landlords, or buyers/sellers directly relevant to
                your enquiry, and with service providers (such as email delivery
                and analytics platforms) who process data on our behalf under
                appropriate confidentiality obligations. We may also disclose
                information where required by UAE law or a valid regulatory
                request.
              </p>

              <h3>Cookies</h3>
              <p>
                Our site uses cookies and similar technologies to remember your
                preferences and measure site performance. You can control or
                disable cookies through your browser settings; some site features
                may not function as intended if you do.
              </p>

              <h3>Data retention and security</h3>
              <p>
                We retain personal information only as long as needed for the
                purposes described above or as required by law, and we apply
                reasonable technical and organizational measures to protect it
                against unauthorized access, loss, or misuse.
              </p>

              <h3>Your rights</h3>
              <p>
                You may ask us to access, correct, or delete the personal
                information we hold about you, or to stop using it for marketing
                purposes, by contacting us using the details below.
              </p>

              <h3>Contact us</h3>
              <p>
                Questions about this policy or how your data is handled can be
                sent to{" "}
                <a href="mailto:info@firstkeyint.com">info@firstkeyint.com</a> or
                Office 25-21, The Exchange Tower, Business Bay, Dubai.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

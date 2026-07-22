import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, Pin, Clock } from "@/components/icons";

export const metadata = {
  title: "Contact First Key International Real Estate",
  description:
    "Ready to buy, sell, or lease in Dubai? Reach First Key International — we respond fast. Call +971 54 501 1151 or send us a message.",
};

export default function Contact() {
  return (
    <>
      <Hero
        page
        actions={false}
        image="/images/sky-palm.jpg"
        eyebrow="Contact"
        title="Let's open the right door for you"
        sub="Ready to buy, sell, or lease in Dubai? Our brokers are here to help — and we respond fast. Your next property starts with one conversation."
      />

      {/* Contact + form */}
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <Eyebrow>Get in touch</Eyebrow>
            <div className="contact-item">
              <span className="contact-item__ico">
                <Phone />
              </span>
              <div>
                <h4>Phone · Available 24/7</h4>
                <a href="tel:+971545011151">+971 54 501 1151</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__ico">
                <Mail />
              </span>
              <div>
                <h4>Email</h4>
                <a href="mailto:info@firstkeyint.com">info@firstkeyint.com</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__ico">
                <Pin />
              </span>
              <div>
                <h4>Office</h4>
                <p>Office 25-21, The Exchange Tower, Business Bay, Dubai</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-item__ico">
                <Clock />
              </span>
              <div>
                <h4>Office hours</h4>
                <p>Monday – Friday · 9:00 AM to 6:00 PM</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="map">
              <iframe
                title="First Key International — Dubai"
                src="https://www.google.com/maps?q=The%20Exchange%20Tower%2C%20Business%20Bay%2C%20Dubai&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import { useState } from "react";
import { useReveal } from "../../hooks/useAnimations";

const contactLinks = [
  {
    href: "https://banegabrand.com",
    icon: "fa-globe",
    label: "Website",
    sub: "banegabrand.com",
    target: "_blank",
  },
  {
    href: "mailto:hello@banegabrand.com",
    icon: "fa-envelope",
    label: "Email",
    sub: "hello@banegabrand.com",
  },
  {
    href: "#",
    icon: "fa-map-marker-alt",
    label: "Location",
    sub: "India — Pan-India Network",
  },
  {
    href: "https://banegabrand.com/create-request",
    icon: "fa-clipboard-list",
    label: "Post a Requirement",
    sub: "Get matched in 24–48 hours",
    target: "_blank",
  },
];

const socialLinks = [
  { href: "https://banegabrand.com", icon: "fa-globe" },
  { href: "#", icon: "fa-linkedin-in", brand: true },
  { href: "#", icon: "fa-instagram", brand: true },
  { href: "#", icon: "fa-twitter", brand: true },
];

export default function Contact() {
  const headerRef = useReveal();
  const leftRef = useReveal();
  const rightRef = useReveal();

  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
    message: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = () => alert("Thank you! We will get back to you soon.");

  return (
    <section className="bb-bg-ground" id="bbContact">
      <div className="container">
        <div className="row mb-5 bb-reveal" ref={headerRef}>
          <div className="col-lg-6">
            <span className="bb-eyebrow">Contact</span>
            <h2>
              Let's Build Something{" "}
              <span className="bb-text-fire">Together</span>
            </h2>
            <div className="bb-rule" />
            <p>
              Whether you want to launch your first brand or scale an existing
              one — I'm here to connect you with the right manufacturing
              partner.
            </p>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-5 bb-reveal" ref={leftRef}>
            <div className="d-flex flex-column gap-4">
              {contactLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.target}
                  rel={l.target ? "noreferrer" : undefined}
                  className="bb-contact-link"
                >
                  <div className="bb-contact-icon">
                    <i className={`fas ${l.icon}`} />
                  </div>
                  <div>
                    <div className="bb-contact-label">{l.label}</div>
                    <div className="bb-text-muted">{l.sub}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="d-flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bb-social-btn"
                >
                  <i className={`${s.brand ? "fab" : "fas"} ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          <div
            className="col-lg-7 bb-reveal"
            ref={rightRef}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="bb-card p-4">
              <div className="row g-3">
                <div className="col-sm-6">
                  <input
                    className="bb-field"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handle}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    className="bb-field"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handle}
                  />
                </div>
                <div className="col-12">
                  <input
                    className="bb-field"
                    type="text"
                    name="product"
                    placeholder="Product / Category (e.g. Skincare, Food)"
                    value={form.product}
                    onChange={handle}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="bb-field"
                    rows="4"
                    name="message"
                    placeholder="Tell me about your brand idea or requirement..."
                    value={form.message}
                    onChange={handle}
                  />
                </div>
                <div className="col-12">
                  <button
                    className="bb-submit w-100 justify-content-center bb-ripple-host"
                    onClick={submit}
                  >
                    <i className="fas fa-paper-plane fa-sm" /> Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

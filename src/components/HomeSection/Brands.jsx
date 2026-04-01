import { useEffect, useRef } from "react";
import { useReveal } from "../../hooks/useAnimations";

const brandLogos = [
  "https://banegabrand.com/public/frontend/assets/img/logo-1.jpeg",
  "https://banegabrand.com/public/frontend/assets/img/logo-2.png",
  "https://banegabrand.com/public/frontend/assets/img/logo-3.webp",
  "https://banegabrand.com/public/frontend/assets/img/logo-4.png",
  "https://banegabrand.com/public/frontend/assets/img/logo-5.png",
];

const reviews = [
  {
    initial: "R",
    name: "Riya Sharma",
    role: "D2C Beauty Founder",
    text: '"Banega Brand helped me launch my skincare line in under 3 months. The manufacturer matching was spot on and quality exceeded expectations."',
  },
  {
    initial: "A",
    name: "Arjun Mehta",
    role: "Food Brand Owner",
    text: '"The platform saved us months of sourcing work. We found a FSSAI-certified food manufacturer within a week and production started in no time."',
  },
  {
    initial: "P",
    name: "Priya Kapoor",
    role: "Wellness Brand CEO",
    text: '"From supplements to packaging — everything handled on one platform. Banega Brand is a must-have for anyone launching in health & wellness."',
  },
];

export default function Brands() {
  const headerRef = useReveal();
  const tickerRef = useReveal();
  const reviewsRowRef = useRef(null);

  useEffect(() => {
    const row = reviewsRowRef.current;
    if (!row) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = row.querySelectorAll(".bb-card");
          cards.forEach((c, i) => {
            c.style.opacity = "0";
            c.style.transform = "translateY(40px)";
            c.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${i * 0.15}s`;
            requestAnimationFrame(() => {
              c.style.opacity = "1";
              c.style.transform = "translateY(0)";
            });
          });
          obs.unobserve(row);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(row);
    return () => obs.disconnect();
  }, []);

  const allLogos = [...brandLogos, ...brandLogos];

  return (
    <section className="bb-bg-snow" id="bbBrands">
      <div className="container">
        <div className="row mb-5 bb-reveal text-center" ref={headerRef}>
          <div className="col">
            <span className="bb-eyebrow">Portfolio</span>
            <h2>
              Brands We've <span className="bb-text-fire">Delivered</span>
            </h2>
            <div className="bb-rule bb-rule-center" />
            <p>
              Trusted by brands that lead the market — we've helped hundreds of
              founders turn ideas into real products on shelves.
            </p>
          </div>
        </div>

        <div className="bb-brands-ticker-wrap mb-5 bb-reveal" ref={tickerRef}>
          <div className="bb-brands-ticker">
            {allLogos.map((src, i) => (
              <div className="bb-brand-card" key={i}>
                <img src={src} alt="Brand Partner" />
              </div>
            ))}
            {[0, 1].map((k) => (
              <div
                key={`label-${k}`}
                className="bb-brand-card"
                style={{
                  background: "var(--bb-fire-pale)",
                  borderColor: "var(--bb-fire-ring)",
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, var(--bb-fire), var(--bb-fire-soft))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {k === 0 ? "600+ Brands" : "Pan India"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4" ref={reviewsRowRef}>
          {reviews.map((r) => (
            <div className="col-md-4" key={r.name}>
              <div className="bb-card bb-ripple-host">
                <div className="bb-review-stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star bb-review-star" />
                  ))}
                </div>
                <p className="mb-3">{r.text}</p>
                <div className="d-flex align-items-center gap-3">
                  <div className="bb-review-avatar">{r.initial}</div>
                  <div>
                    <div className="bb-review-name">{r.name}</div>
                    <div className="bb-text-muted">{r.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { useReveal } from "../../hooks/useAnimations";

const services = [
  {
    num: "01",
    icon: "fa-tag",
    title: "White Label Manufacturing",
    desc: "Ready-made products you can sell under your own brand. Fastest route to market with minimal investment.",
    features: ["Fast product launch", "Low MOQ", "100+ ready formulations"],
    pinned: false,
  },
  {
    num: "02",
    icon: "fa-flask",
    title: "Private Label Manufacturing",
    desc: "Customise existing formulas to create a differentiated branded product. Better margins, unique positioning.",
    features: [
      "Custom formulation",
      "Unique branding",
      "Better profit margins",
    ],
    pinned: true,
  },
  {
    num: "03",
    icon: "fa-industry",
    title: "Contract Manufacturing",
    desc: "End-to-end manufacturing from product development to bulk production. Ideal for established brands scaling.",
    features: [
      "Full customisation",
      "Large volume capacity",
      "Quality certifications",
    ],
    pinned: false,
  },
];

export default function Services() {
  const headerRef = useReveal();

  // ✅ create array refs
  const cardsRef = useRef([]);

  // ✅ apply reveal manually
  useEffect(() => {
    cardsRef.current.forEach((el) => {
      if (el) {
        el.classList.add("active"); // OR your reveal logic
      }
    });
  }, []);

  return (
    <section className="bb-bg-snow" id="bbServices">
      <div className="container">
        {/* HEADER */}
        <div className="row mb-5 bb-reveal" ref={headerRef}>
          <div className="col-lg-6">
            <span className="bb-eyebrow">What I Offer</span>
            <h2>
              Manufacturing <span className="bb-text-fire">Solutions</span>
            </h2>
            <div className="bb-rule" />
            <p>
              From idea to shelf — I help brands access the right manufacturing
              model for their goals, budget and growth stage.
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="row g-4">
          {services.map((s, i) => (
            <div
              key={s.num}
              className="col-md-4 bb-reveal"
              ref={(el) => (cardsRef.current[i] = el)} // ✅ FIXED
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className={`bb-card h-100 bb-ripple-host ${s.pinned ? "bb-card-pinned" : ""}`}
              >
                <div className="bb-service-num">{s.num}</div>

                <div className="bb-icon-box">
                  <i className={`fas ${s.icon}`} />
                </div>

                <h3>{s.title}</h3>

                <p className="mt-2 mb-3">{s.desc}</p>

                <div className="bb-text-muted d-flex flex-column gap-1">
                  {s.features.map((f) => (
                    <div key={f}>
                      <i className="fas fa-check me-2 bb-text-fire" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

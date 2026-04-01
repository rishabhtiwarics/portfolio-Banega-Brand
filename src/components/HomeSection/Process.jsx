import { useReveal } from "../../hooks/useAnimations";

const steps = [
  {
    num: "1",
    type: "ring",
    title: "Post Your Requirement",
    desc: "Tell us your product, MOQ, budget and target market. Our team reviews your brief within 24 hours.",
  },
  {
    num: "2",
    type: "solid",
    title: "Get Matched with Factories",
    desc: "Shortlisted manufacturers matched based on your category, certifications, capacity and quality requirements.",
    pinned: true,
  },
  {
    num: "3",
    type: "ring",
    title: "Sample → Production → Launch",
    desc: "From samples to bulk production — we handle it professionally so you focus on building your brand.",
  },
];

export default function Process() {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  return (
    <section className="bb-bg-pale" id="bbProcess">
      <div className="container">
        <div className="row mb-5 bb-reveal text-center" ref={headerRef}>
          <div className="col">
            <span className="bb-eyebrow">Process</span>
            <h2>
              From Idea to <span className="bb-text-fire">Market</span>
            </h2>
            <div className="bb-rule bb-rule-center" />
            <p className="mx-auto" style={{ maxWidth: "480px" }}>
              A transparent, step-by-step process to help you find the right
              manufacturer and launch your brand in India.
            </p>
          </div>
        </div>
        <div className="row g-4 bb-reveal" ref={cardsRef}>
          {steps.map((s) => (
            <div className="col-md-4 text-center" key={s.num}>
              <div
                className={`bb-card h-100 bb-ripple-host ${s.pinned ? "bb-card-pinned" : ""}`}
              >
                <div
                  className={`bb-step-circle ${s.type === "solid" ? "bb-step-solid" : "bb-step-ring"}`}
                >
                  {s.num}
                </div>
                <h3>{s.title}</h3>
                <p className="mt-2">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

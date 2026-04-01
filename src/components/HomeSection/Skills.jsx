import { useReveal } from "../../hooks/useAnimations";

const skills = [
  { label: "B2B Platform Strategy", pct: 95 },
  { label: "Private Label Sourcing", pct: 90 },
  { label: "FMCG Manufacturing", pct: 88 },
  { label: "Brand Development", pct: 92 },
  { label: "Supplier Vetting & QC", pct: 85 },
];

const stats = [
  { icon: "fa-boxes", title: "600+ Manufacturers", sub: "Verified Partners" },
  { icon: "fa-th-large", title: "20+ Categories", sub: "FMCG Segments" },
  { icon: "fa-users", title: "D2C Founders", sub: "Clients Served" },
  { icon: "fa-map", title: "Pan India", sub: "Network Coverage" },
];

export default function Skills() {
  const headerRef = useReveal();
  const barsRef = useReveal();
  const statsRef = useReveal();

  return (
    <section className="bb-bg-ground" id="bbSkills" style={{ overflowX: 'hidden' }}>
      <div className="container">
        <div className="row mb-5 bb-reveal" ref={headerRef}>
          <div className="col-lg-6">
            <span className="bb-eyebrow">Expertise</span>
            <h2>
              Core <span className="bb-text-fire">Competencies</span>
            </h2>
            <div className="bb-rule" />
            <p>
              Bridging the gap between brand vision and manufacturing reality
              requires a unique blend of industry knowledge and relationship
              building.
            </p>
          </div>
        </div>
        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-6 bb-reveal" ref={barsRef}>
            {skills.map((s) => (
              <div className="bb-skill-row" key={s.label}>
                <div className="bb-skill-header">
                  <span>{s.label}</span>
                  <span className="bb-skill-pct">{s.pct}%</span>
                </div>
                <div className="bb-skill-track">
                  <div className="bb-skill-fill" data-width={s.pct} />
                </div>
              </div>
            ))}
          </div>
          <div
            className="col-12 col-lg-6 bb-reveal"
            ref={statsRef}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="row g-3">
              {stats.map((s) => (
                <div className="col-6" key={s.title}>
                  <div className="bb-card text-center py-3">
                    <div className="bb-icon-box bb-icon-box-cx">
                      <i className={`fas ${s.icon}`} />
                    </div>
                    <div
                      className="fw-bold mt-2 bb-text-ink"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {s.title}
                    </div>
                    <div className="bb-text-muted">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
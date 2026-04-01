import { useReveal } from "../../hooks/useAnimations";

export default function About() {
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <section className="bb-bg-ground" id="bbAbout">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 bb-reveal" ref={ref1}>
            <div className="bb-about-img-wrap">
              <img
                src="https://banegabrand.com/public/frontend/assets/img/supplier-b2b.png"
                alt="About"
                className="bb-about-img"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Banega+Brand&size=500&background=FFF3ED&color=fe6418&bold=true";
                }}
              />
              <div className="bb-about-stamp">
                <i className="fas fa-award me-2" />
                Est. 2024
              </div>
            </div>
          </div>
          <div
            className="col-lg-7 bb-reveal"
            ref={ref2}
            style={{ transitionDelay: "0.15s" }}
          >
            <span className="bb-eyebrow">About Me</span>
            <h2>
              The Mind Behind <span className="bb-text-fire">Banega Brand</span>
            </h2>
            <div className="bb-rule" />
            <p className="bb-text-lead mb-3">
              I identified a massive gap in India's FMCG supply chain — the lack
              of a trusted, transparent marketplace connecting aspiring brand
              owners with verified Indian manufacturers.
            </p>
            <p className="mb-3">
              With deep experience in B2B sourcing and manufacturing ecosystems,
              I built Banega Brand as a full-stack solution for private label,
              white label and contract manufacturing — bringing together 600+
              factories, packaging suppliers and product developers under one
              roof.
            </p>
            <p className="bb-text-muted mb-4">
              My mission: democratise brand building. Whether you're a
              first-time founder or an established FMCG company, Banega Brand
              gives you the infrastructure to launch, scale and compete with
              confidence across Beauty, Food, Wellness, Fashion and beyond.
            </p>
            <div className="row g-3">
              {[
                {
                  icon: "fa-building",
                  title: "Platform Founder",
                  sub: "Banega Brand",
                },
                {
                  icon: "fa-map-marker-alt",
                  title: "Pan India",
                  sub: "Manufacturing Network",
                },
              ].map((item) => (
                <div className="col-sm-6" key={item.title}>
                  <div className="bb-card p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bb-icon-box bb-icon-box-sm">
                        <i className={`fas ${item.icon}`} />
                      </div>
                      <div>
                        <div className="fw-bold bb-text-ink">{item.title}</div>
                        <div className="bb-text-muted">{item.sub}</div>
                      </div>
                    </div>
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

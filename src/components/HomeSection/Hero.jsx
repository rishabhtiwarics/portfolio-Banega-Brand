import { useEffect, useRef } from "react";
import { useReveal } from "../../hooks/useAnimations";

export default function Hero() {
  const revealRef = useReveal();
  const particlesRef = useRef(null);
  const frameRef = useRef(null);

  // Floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "bb-particle";
      const size = Math.random() * 6 + 3;
      Object.assign(p.style, {
        width: size + "px",
        height: size + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        "--dur": Math.random() * 5 + 4 + "s",
        "--delay": Math.random() * 6 + "s",
        "--op": Math.random() * 0.15 + 0.05,
      });
      container.appendChild(p);
    }
    return () => {
      container.innerHTML = "";
    };
  }, []);

  // Parallax on hero photo
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const onScroll = () => {
      const offset = window.scrollY * 0.06;
      frame.style.transform = `perspective(800px) rotateY(-8deg) rotateX(4deg) translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.count);
            if (isNaN(target)) return;
            let start = 0;
            const step = target / (1800 / 16);
            const suffix = "+";
            const timer = setInterval(() => {
              start = Math.min(start + step, target);
              el.textContent = Math.floor(start) + suffix;
              if (start >= target) clearInterval(timer);
            }, 16);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    document
      .querySelectorAll("[data-count]")
      .forEach((el) => counterObserver.observe(el));
    return () => counterObserver.disconnect();
  }, []);

  return (
    <section className="bb-hero" id="bbHero">
      <div className="bb-hero-orb-a" />
      <div className="bb-hero-orb-b" />
      <div className="bb-hero-orb-c" />
      <div className="bb-particles" ref={particlesRef} />
      <div className="container">
        <div
          className="bb-hero-row d-flex align-items-center gap-5 bb-reveal"
          ref={revealRef}
        >
          <div className="flex-grow-1">
            <div className="bb-founder-pill">
              <div className="bb-founder-avatar">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=104&h=104&fit=crop&crop=face&auto=format&q=80"
                  alt="Rahul Sharma"
                />
              </div>
              <div>
                <div className="bb-founder-name">Rahul Sharma</div>
                <div className="bb-founder-role">
                  Founder &amp; CEO, Banega Brand
                </div>
              </div>
            </div>
            <h1 className="bb-hero-headline">
              Connecting <span>Brands</span> with India's Best Manufacturers
            </h1>
            <p className="bb-hero-desc mt-3">
              I'm the Owner &amp; Founder of{" "}
              <strong style={{ color: "var(--bb-ink)" }}>Banega Brand</strong> —
              India's leading private label &amp; contract manufacturing
              marketplace. I help D2C founders, FMCG brands and startups launch
              verified products at scale.
            </p>
            <div className="bb-hero-btns d-flex gap-3 flex-wrap">
              <a href="#bbContact" className="bb-btn-fire bb-ripple-host">
                <i className="fas fa-paper-plane fa-sm" /> Get In Touch
              </a>
              <a
                href="https://banegabrand.com"
                target="_blank"
                rel="noreferrer"
                className="bb-btn-ghost"
              >
                <i className="fas fa-external-link-alt fa-sm" /> Visit Platform
              </a>
            </div>
            <div className="bb-hero-stats d-flex gap-0 mt-4 flex-wrap">
              <div className="pe-4">
                <div className="bb-stat-num" data-count="600">
                  0+
                </div>
                <div className="bb-stat-label">Manufacturers</div>
              </div>
              <div className="px-4 bb-stat-sep">
                <div className="bb-stat-num" data-count="20">
                  0+
                </div>
                <div className="bb-stat-label">Categories</div>
              </div>
              <div className="ps-4 bb-stat-sep">
                <div className="bb-stat-num">Pan</div>
                <div className="bb-stat-label">India Network</div>
              </div>
            </div>
          </div>
          <div className="bb-photo-frame-wrap">
            <div className="bb-photo-frame" ref={frameRef}>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=680&h=760&fit=crop&auto=format&q=80"
                alt="Manufacturing"
              />
            </div>
            <div className="bb-photo-stamp">
              <i className="fas fa-award" style={{ marginRight: "8px" }} />
              Est. 2024 · Pan India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

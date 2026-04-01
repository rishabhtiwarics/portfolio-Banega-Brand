import { useEffect, useRef } from "react";
import { useReveal } from "../../hooks/useAnimations";

const categories = [
  { icon: "💄", name: "Beauty & Personal Care" },
  { icon: "👗", name: "Fashion" },
  { icon: "🍵", name: "Food & Beverages" },
  { icon: "🌿", name: "Ayurveda & Wellness" },
  { icon: "💊", name: "Health & Supplements" },
  { icon: "🧸", name: "Baby Care & Toys" },
  { icon: "🏠", name: "Home & Living" },
  { icon: "⚡", name: "Electrical & Electronics" },
];

export default function Categories() {
  const headerRef = useReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tiles = grid.querySelectorAll(".bb-cat-tile");
          tiles.forEach((t, i) => {
            t.style.opacity = "0";
            t.style.transform = "translateY(30px) scale(0.92)";
            t.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s`;
            requestAnimationFrame(() => {
              t.style.opacity = "1";
              t.style.transform = "translateY(0) scale(1)";
            });
          });
          obs.unobserve(grid);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bb-bg-snow" id="bbCategories">
      <div className="container">
        <div className="row mb-5 bb-reveal" ref={headerRef}>
          <div className="col-lg-6">
            <span className="bb-eyebrow">Industries</span>
            <h2>
              Categories We <span className="bb-text-fire">Cover</span>
            </h2>
            <div className="bb-rule" />
            <p>
              From beauty formulations to food products — we connect brands with
              verified factories across India's most in-demand FMCG segments.
            </p>
          </div>
        </div>
        <div className="row g-3" ref={gridRef}>
          {categories.map((cat) => (
            <div className="col-6 col-sm-4 col-lg-3" key={cat.name}>
              <div className="bb-cat-tile">
                <span className="bb-cat-icon">{cat.icon}</span>
                <div className="bb-cat-name">{cat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

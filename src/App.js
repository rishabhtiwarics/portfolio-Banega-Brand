import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import About from "./components/HomeSection/About";
import Brands from "./components/HomeSection/Brands";
import Categories from "./components/HomeSection/Categories";
import Contact from "./components/HomeSection/Contact";
import Hero from "./components/HomeSection/Hero";
import Process from "./components/HomeSection/Process";
import Services from "./components/HomeSection/Services";
import Skills from "./components/HomeSection/Skills";
import Footer from "./components/Organisms/Footer";
import Navbar from "./components/Organisms/Navbar";
import "./index.css";

export default function App() {
  // Global 3D tilt on cards/tiles
  useEffect(() => {
    const apply = () => {
      const els = document.querySelectorAll(
        ".bb-card,.bb-cat-tile,.bb-photo-frame,.bb-brand-card",
      );
      els.forEach((el) => {
        if (el._tiltBound) return;
        el._tiltBound = true;
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px) scale(1.03)`;
          el.style.boxShadow = `${-x * 18}px ${-y * 18}px 40px var(--bb-fire-glow)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "";
          el.style.boxShadow = "";
        });
      });
    };
    // Run after DOM settles
    const timer = setTimeout(apply, 300);
    return () => clearTimeout(timer);
  }, []);

  // Global ripple
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent =
      "@keyframes bb-ripple { to { transform: scale(4); opacity: 0; } }";
    document.head.appendChild(style);

    const onClick = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const rip = document.createElement("span");
      const size = Math.max(r.width, r.height);
      Object.assign(rip.style, {
        position: "absolute",
        width: size + "px",
        height: size + "px",
        left: e.clientX - r.left - size / 2 + "px",
        top: e.clientY - r.top - size / 2 + "px",
        background: "rgba(254,100,24,0.22)",
        borderRadius: "50%",
        transform: "scale(0)",
        opacity: "1",
        animation: "bb-ripple 0.6s ease-out forwards",
        pointerEvents: "none",
      });
      el.appendChild(rip);
      setTimeout(() => rip.remove(), 700);
    };

    const applyRipple = () => {
      document.querySelectorAll(".bb-ripple-host").forEach((el) => {
        if (!el._rippleBound) {
          el._rippleBound = true;
          el.addEventListener("click", onClick);
        }
      });
    };
    const timer = setTimeout(applyRipple, 300);

    // Magnetic social buttons
    const applyMagnetic = () => {
      document.querySelectorAll(".bb-social-btn").forEach((btn) => {
        if (btn._magBound) return;
        btn._magBound = true;
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.35;
          const dy = (e.clientY - r.top - r.height / 2) * 0.35;
          btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.12)`;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "";
        });
      });
    };
    const timer2 = setTimeout(applyMagnetic, 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Categories />
      <Process />
      <Brands />
      <Contact />
      <Footer />
    </>
  );
}

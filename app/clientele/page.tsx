"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/layout/Footer";

const EASE = [0.76, 0, 0.24, 1] as const;

function Reveal({
  children, delay = 0, direction = "up",
}: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"  ? { opacity: 0, x: -48 } :
    direction === "right" ? { opacity: 0, x:  48 } :
                            { opacity: 0, y:  48 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px", amount: 0.1 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Watermark({ src, style }: { src: string; style: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", pointerEvents: "none", userSelect: "none", ...style }}>
      <img src={src} alt="" aria-hidden="true" style={{ width: "100%", display: "block" }} />
    </div>
  );
}

const PAT = ["a","c","b","d","a","c","b","d","c","b","d","a","c","b","d","a","b","d","a","c","b","d","a","c","d","a","c","b","d","a","c","b","a","c","b","d","a","c","b","d"];
const COLORS: Record<string, string> = { a: "#C8651A", b: "#A83E10", c: "#3A7D6E", d: "#2D6459" };

// ── All client logos ──────────────────────────────────────
const LOGOS = [
  { src: "/images/clients/access-lg-logo.png",       alt: "Access Bank" },
  { src: "/images/clients/cocoa-abrabopa-logo.png",   alt: "Cocoa Abrabopa" },
  { src: "/images/clients/gacc-logo.png",             alt: "GACC" },
  { src: "/images/clients/logo-african-tiger.png",    alt: "African Tiger" },
  { src: "/images/clients/logo-amaja.png",            alt: "Amaja" },
  { src: "/images/clients/logo-anc-development.png",  alt: "ANC Development" },
  { src: "/images/clients/logo-blu.png",              alt: "Blu" },
  { src: "/images/clients/logo-cenops.jpeg",          alt: "Cenops" },
  { src: "/images/clients/logo-chapel-hill.png",      alt: "Chapel Hill" },
  { src: "/images/clients/logo-csd.jpeg",             alt: "CSD" },
  { src: "/images/clients/logo-databank.jpeg",        alt: "Databank" },
  { src: "/images/clients/logo-firstbanc.png",        alt: "FirstBanc" },
  { src: "/images/clients/logo-gras-savoye.jpg",      alt: "Gras Savoye" },
  { src: "/images/clients/logo-gse.png",              alt: "Ghana Stock Exchange" },
  { src: "/images/clients/logo-hmd.png",              alt: "HMD" },
  { src: "/images/clients/logo-iita.jpeg",            alt: "IITA" },
  { src: "/images/clients/logo-iwad.png",             alt: "IWAD" },
  { src: "/images/clients/logo-lexta.jpg",            alt: "Lexta" },
  { src: "/images/clients/logo-movis.png",            alt: "Movis" },
  { src: "/images/clients/logo-sanofi.png",           alt: "Sanofi" },
  { src: "/images/clients/logo-scania.jpeg",          alt: "Scania" },
  { src: "/images/clients/logo-tema-lng.jpeg",        alt: "Tema LNG" },
  { src: "/images/clients/logo-va-life.png",          alt: "VA Life" },
  { src: "/images/clients/logo-vanguard.png",         alt: "Vanguard" },
  { src: "/images/clients/logo-weinco.jpeg",          alt: "Weinco" },
  { src: "/images/clients/mtn-logo.jpeg",             alt: "MTN" },
  { src: "/images/clients/orsam-logo.png",            alt: "Orsam" },
  { src: "/images/clients/petra_logo.png",            alt: "Petra" },
];

// Split into two rows
const ROW_1 = LOGOS.slice(0, 14);
const ROW_2 = LOGOS.slice(14);

const INDUSTRIES = [
  { name: "Financial Services",      desc: "Banks, insurance companies, asset managers and investment firms." },
  { name: "Telecommunications",      desc: "Mobile network operators and technology service providers." },
  { name: "Healthcare & Pharma",     desc: "Hospitals, pharmaceutical companies and health-focused NGOs." },
  { name: "Manufacturing",           desc: "Industrial manufacturers and production companies." },
  { name: "Energy & Resources",      desc: "Oil and gas, mining and energy infrastructure organisations." },
  { name: "Agriculture",             desc: "Agribusiness, farming cooperatives and agricultural development." },
  { name: "Public Sector & NGOs",    desc: "Government agencies, development organisations and civil society." },
  { name: "Professional Services",   desc: "Law firms, consulting practices and advisory businesses." },
  { name: "Trade & Distribution",    desc: "Import/export, logistics and distribution companies." },
  { name: "Education",               desc: "Universities, schools and learning institutions." },
  { name: "Technology",              desc: "Software, fintech and digital services companies." },
  { name: "Transport & Logistics",   desc: "Fleet operators, freight forwarders and transport businesses." },
];

export default function ClientelePage() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bannerY       = useTransform(scrollY, [0, 500], [0, 150]);
  const bannerOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div>

      {/* ── HERO BANNER ──────────────────────────────── */}
      <div ref={bannerRef} style={{ position: "relative", height: "60vh", minHeight: "380px", overflow: "hidden" }}>
        <motion.div style={{
          position: "absolute", inset: "-10%",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows:    "repeat(5, 1fr)",
          y: bannerY,
        }}>
          {PAT.map((p, i) => <div key={i} style={{ background: COLORS[p] }} />)}
        </motion.div>

        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.4, mixBlendMode: "overlay", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")` }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(26,20,16,0.78) 100%)" }} />

        <motion.div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "2rem",
          opacity: bannerOpacity,
        }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}
          >
            Who We Serve
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.0, letterSpacing: "-0.01em" }}
          >
            Organisations That<br />
            <em style={{ color: "#C8651A" }}>Choose to Be Better.</em>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── OPENING STATEMENT ────────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "6rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/nea-onnim.png"
          style={{ right: "-4%", bottom: "-5%", width: "35%", opacity: 0.04 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <Reveal direction="left">
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                Our Clients
              </p>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05 }}>
                Over 200 organisations across Ghana and West Africa.
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "1.2rem" }}>
                Our clients range from Ghanaian SMEs taking their first steps toward building professional people management systems, to large multinational corporations operating across multiple African markets. What they share is not size or sector — it is the conviction that their people are worth investing in properly.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)" }}>
                We have worked across financial services, telecommunications, healthcare, manufacturing, energy, agriculture, the public sector, and beyond. In every engagement, we bring the same commitment — bespoke solutions, honest counsel, and genuine investment in your outcomes.
              </p>
            </Reveal>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
            {[
              { value: "200+", label: "Clients Served" },
              { value: "12+",  label: "Industries" },
              { value: "15+",  label: "Years Experience" },
              { value: "98%",  label: "Client Satisfaction" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div style={{ borderTop: "2px solid #C8651A", paddingTop: "1rem" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", fontWeight: 700, color: "#C8651A", lineHeight: 1, marginBottom: "0.3rem" }}>{stat.value}</p>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,20,16,0.45)" }}>{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ─────────────────────────────── */}
      <section style={{ background: "#1A1410", padding: "5rem 0", overflow: "hidden", position: "relative" }}>
        <Watermark
          src="/symbols/adinkrahene.png"
          style={{ right: "-3%", top: "50%", width: "25%", opacity: 0.05, transform: "translateY(-50%)" }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 4rem", marginBottom: "3rem" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.5rem", fontWeight: 500 }}>
              Trusted By
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05 }}>
              A selection of our clients.
            </h2>
          </Reveal>
        </div>

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <div style={{
            display:   "flex",
            gap:       "3rem",
            animation: "marquee-left 35s linear infinite",
            width:     "max-content",
          }}>
            {[...ROW_1, ...ROW_1, ...ROW_1].map((logo, i) => (
              <div
                key={i}
                style={{
                  width:          "140px",
                  height:         "70px",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    maxWidth:   "120px",
                    maxHeight:  "55px",
                    objectFit:  "contain",
                    filter:     "grayscale(1) brightness(10) invert(0)",
                    opacity:    0.45,
                    transition: "opacity 0.4s ease, filter 0.4s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.filter  = "grayscale(0) brightness(1) invert(0)";
                    el.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.filter  = "grayscale(1) brightness(10) invert(0)";
                    el.style.opacity = "0.45";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: "hidden" }}>
          <div style={{
            display:   "flex",
            gap:       "3rem",
            animation: "marquee-right 40s linear infinite",
            width:     "max-content",
          }}>
            {[...ROW_2, ...ROW_2, ...ROW_2].map((logo, i) => (
              <div
                key={i}
                style={{
                  width:          "140px",
                  height:         "70px",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    maxWidth:   "120px",
                    maxHeight:  "55px",
                    objectFit:  "contain",
                    filter:     "grayscale(1) brightness(10) invert(0)",
                    opacity:    0.45,
                    transition: "opacity 0.4s ease, filter 0.4s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.filter  = "grayscale(0) brightness(1) invert(0)";
                    el.style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.filter  = "grayscale(1) brightness(10) invert(0)";
                    el.style.opacity = "0.45";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.333%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-33.333%); }
            to   { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "7rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/agyindawuru.png"
          style={{ left: "-4%", bottom: "-5%", width: "32%", opacity: 0.05 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
              Sectors
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05, marginBottom: "4rem" }}>
              Twelve industries.<br />One standard of excellence.
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.06}>
                <motion.div
                  style={{
                    padding:     "2rem 1.8rem",
                    borderTop:   "1px solid rgba(26,20,16,0.08)",
                    borderRight: i % 3 !== 2 ? "1px solid rgba(26,20,16,0.08)" : "none",
                  }}
                  whileHover={{ background: "rgba(200,101,26,0.04)" }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.4rem" }}>
                    {ind.name}
                  </p>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(26,20,16,0.5)" }}>
                    {ind.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS PLACEHOLDER ──────────────────── */}
      <section style={{ background: "#1A3330", padding: "7rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/adinkrahene.png"
          style={{ right: "-4%", bottom: "-5%", width: "36%", opacity: 0.06 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
              What Our Clients Say
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "4rem" }}>
              Client Testimonials
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {[1, 2, 3].map(i => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding:     "3rem",
                  borderTop:   "2px solid rgba(200,101,26,0.3)",
                  background:  "rgba(245,237,216,0.03)",
                  minHeight:   "280px",
                  display:     "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "#C8651A", lineHeight: 1, marginBottom: "1.5rem", opacity: 0.5 }}>
                      "
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.05rem", color: "rgba(245,237,216,0.35)", lineHeight: 1.7 }}>
                      Client testimonial coming soon.
                    </p>
                  </div>
                  <div style={{ marginTop: "2rem", borderTop: "1px solid rgba(245,237,216,0.08)", paddingTop: "1rem" }}>
                    <p style={{ fontSize: "0.78rem", color: "rgba(245,237,216,0.25)", letterSpacing: "0.1em" }}>
                      — Client Name, Organisation
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ background: "#C8651A", padding: "6rem 4rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(245,237,216,0.6)", marginBottom: "1rem", fontWeight: 500 }}>
              Join Our Clients
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Ready to build an organisation your people are proud of?
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(245,237,216,0.75)", marginBottom: "2.5rem" }}>
              Join over 200 organisations across Ghana and West Africa who have chosen IHR as their trusted people and business advisory partner.
            </p>
            <motion.a
              href="/contact"
              style={{
                display: "inline-block", background: "#F5EDD8",
                color: "#1A1410", padding: "1rem 2.8rem",
                fontSize: "0.75rem", letterSpacing: "0.2em",
                textTransform: "uppercase", textDecoration: "none", fontWeight: 500,
              }}
              whileHover={{ background: "#1A1410", color: "#F5EDD8" }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              Let's Talk
            </motion.a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
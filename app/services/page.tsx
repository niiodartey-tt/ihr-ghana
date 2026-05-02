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

const SERVICES = [
  {
    id:      "talent-solutions",
    number:  "01",
    name:    "Talent Solutions",
    tagline: "The right people, in the right roles, at the right time.",
    desc:    "Exceptional organisations are built by exceptional people. Our Talent Solutions practice covers the full spectrum of recruitment and talent acquisition — from executive search and headhunting to volume recruitment process outsourcing. We bring deep knowledge of the Ghanaian and West African talent landscape, rigorous assessment methodologies, and a genuine commitment to finding candidates who don't just meet a job description, but truly belong in your organisation.",
    deliverables: [
      "Executive search and headhunting for senior and specialist roles",
      "Database search and candidate pre-screening",
      "Recruitment advertising and candidate attraction",
      "Recruitment Process Outsourcing (RPO)",
      "Online psychometric and leadership behavioural assessments",
      "Competency-based interview design and facilitation",
      "Onboarding programme design",
    ],
    bg:      "#FDFAF5",
    text:    "#1A1410",
    accent:  "#C8651A",
    light:   false,
    watermark: "/symbols/adinkrahene.png",
    wmStyle: { right: "-5%", bottom: "-5%", width: "38%", opacity: 0.05 },
  },
  {
    id:      "hr-strategy-organisation",
    number:  "02",
    name:    "HR Strategy & Organisation Design",
    tagline: "Structure that enables. Strategy that endures.",
    desc:    "An organisation's structure is either an enabler or an obstacle — rarely neutral. We work with leadership teams to align organisational design with business strategy, ensuring that your structure, your roles, and your people are positioned to deliver maximum value. From workforce planning and job evaluation to the development of comprehensive HR policies, we build the frameworks that allow your organisation to operate with clarity, fairness, and purpose.",
    deliverables: [
      "Organisational design and restructuring",
      "Job description development and role definition",
      "Competency framework and career path design",
      "Job evaluation and grade structure development",
      "Skills audit and competency assessment",
      "Workload analysis and staffing reviews",
      "HR Policies & Procedures Manual development",
      "Staff Handbook and employment contract preparation",
    ],
    bg:      "#1A1410",
    text:    "#F5EDD8",
    accent:  "#C8651A",
    light:   true,
    watermark: "/symbols/agyindawuru.png",
    wmStyle: { left: "-4%", top: "15%", width: "32%", opacity: 0.08 },
  },
  {
    id:      "leadership-learning",
    number:  "03",
    name:    "Leadership & Learning",
    tagline: "Develop leaders who build organisations that outlast them.",
    desc:    "The organisations that endure are those that invest deliberately in the growth of their people — not just their skills, but their judgment, their character, and their capacity to lead. Our Leadership & Learning practice designs and delivers bespoke programmes that go beyond conventional training. We build leaders who inspire trust, create cultures of accountability, and leave behind organisations stronger than they found them.",
    deliverables: [
      "Leadership capability assessment and gap analysis",
      "Bespoke leadership development programmes",
      "Executive coaching and individual mentoring",
      "Succession planning and talent pipeline development",
      "Learning & Development strategy design",
      "Bespoke training programmes across functional and leadership competencies",
      "Learning needs analysis",
      "Facilitation of leadership team effectiveness sessions",
    ],
    bg:      "#C8651A",
    text:    "#F5EDD8",
    accent:  "#F5EDD8",
    light:   true,
    watermark: "/symbols/nea-onnim.png",
    wmStyle: { right: "-3%", bottom: "-8%", width: "36%", opacity: 0.1, filter: "brightness(10)" },
  },
  {
    id:      "performance-reward",
    number:  "04",
    name:    "Performance & Reward",
    tagline: "Recognise the right things. Reward the right people.",
    desc:    "Performance management and reward are two sides of the same coin — and when they are misaligned, organisations pay a heavy price in disengagement, unfairness, and lost talent. We help organisations design systems that measure what genuinely matters, create meaningful conversations between managers and their teams, and ensure that compensation and benefits are competitive, equitable, and strategically aligned. Our reward practice is grounded in robust market data and a deep understanding of what truly motivates people.",
    deliverables: [
      "Performance management system design and implementation",
      "KPI and balanced scorecard framework development",
      "Performance review process redesign",
      "Manager coaching for effective performance conversations",
      "Compensation and benefits surveys",
      "Remuneration strategy and pay structure development",
      "Executive compensation design",
      "Market pay benchmarking and compensation advisory",
    ],
    bg:      "#3A7D6E",
    text:    "#F5EDD8",
    accent:  "#F5EDD8",
    light:   true,
    watermark: "/symbols/adinkrahene.png",
    wmStyle: { right: "-5%", top: "10%", width: "34%", opacity: 0.08 },
  },
  {
    id:      "change-management",
    number:  "05",
    name:    "Change Management",
    tagline: "Take your people with you. Every step of the way.",
    desc:    "Change fails not because the strategy is wrong, but because the human dimension is underestimated. Transitions — whether structural, cultural, technological, or strategic — require careful management of the people who must live through them. We provide structured, empathetic change management support that helps leaders communicate clearly, build genuine buy-in, manage resistance constructively, and embed change in ways that actually last.",
    deliverables: [
      "Change readiness assessment",
      "Stakeholder mapping and engagement planning",
      "Change communication strategy and content",
      "Leadership alignment and change coalition building",
      "Transition management support",
      "Resistance identification and management",
      "Post-change culture embedding and sustainability planning",
    ],
    bg:      "#1A1410",
    text:    "#F5EDD8",
    accent:  "#C8651A",
    light:   true,
    watermark: "/symbols/agyindawuru.png",
    wmStyle: { left: "-4%", bottom: "10%", width: "30%", opacity: 0.08 },
  },
  {
    id:      "business-advisory",
    number:  "06",
    name:    "Business Advisory",
    tagline: "Strategic counsel at the intersection of people and performance.",
    desc:    "The most consequential business decisions are ultimately decisions about people — how you structure the organisation, what you measure, how you lead, and what you reward. Our Business Advisory practice brings together strategic thinking and deep HR expertise to support boards, executives, and leadership teams with the decisions that shape their organisations. We also work with clients to develop and implement Business Strategy using the Balanced Scorecard framework — creating visible connections between strategy, measurement, and execution that drive real results.",
    deliverables: [
      "Organisational effectiveness reviews and advisory",
      "Board and executive advisory services",
      "Business strategy development and people alignment",
      "Balanced Scorecard design and implementation",
      "Strategy mapping and KPI cascade",
      "HR due diligence for mergers and acquisitions",
      "Interim HR leadership and management support",
    ],
    bg:      "#FDFAF5",
    text:    "#1A1410",
    accent:  "#C8651A",
    light:   false,
    watermark: "/symbols/nea-onnim.png",
    wmStyle: { right: "-4%", top: "10%", width: "36%", opacity: 0.05 },
  },
];

export default function ServicesPage() {
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
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#1A3330", marginBottom: "0.8rem", fontWeight: 500 }}
          >
            What We Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.0, letterSpacing: "-0.01em" }}
          >
            People Solutions.<br />
            <em style={{ color: "#1A3330" }}>Built to Last.</em>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── INTRO + SERVICE INDEX ─────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "6rem 4rem", borderBottom: "1px solid rgba(26,20,16,0.08)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginBottom: "4rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Our Services
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05 }}>
                  Six practice areas.<br />One integrated philosophy.
                </h2>
              </div>
              <div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "1.2rem" }}>
                  IHR Ghana enlists a participatory and collaborative approach to fashioning the business solutions you require. We position your organisation strategically to gain competitive advantage — and we do it through six interconnected practice areas that cover every dimension of your people and business challenges.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)" }}>
                  Whether you engage us for one service or all six, you get the same quality of thinking, the same candour, and the same commitment to results that endure.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Service index grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(26,20,16,0.1)" }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <a
                  href={`#${s.id}`}
                  style={{
                    display: "block", padding: "1.8rem 1.5rem",
                    borderBottom: "1px solid rgba(26,20,16,0.1)",
                    borderRight: i % 3 !== 2 ? "1px solid rgba(26,20,16,0.1)" : "none",
                    textDecoration: "none",
                    transition: "background 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,101,26,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.4rem" }}>
                    {s.number}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 600, color: "#1A1410", lineHeight: 1.2 }}>
                    {s.name}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(26,20,16,0.45)", marginTop: "0.3rem", lineHeight: 1.5 }}>
                    {s.tagline}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SECTIONS — STICKY STACK ──────────── */}
      <div style={{ position: "relative" }}>
        {SERVICES.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            style={{
              background: service.bg,
              minHeight:  "100vh",
              display:    "flex",
              alignItems: "center",
              padding:    "7rem 4rem",
              position:   "sticky",
              top:        0,
              zIndex:     i + 2,
              overflow:   "clip",
            }}
          >
            <Watermark src={service.watermark} style={service.wmStyle} />

            <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

                {/* Left */}
                <div>
                  <Reveal direction="left">
                    <p style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(6rem, 12vw, 10rem)",
                      fontWeight: 700,
                      color: service.light ? "rgba(245,237,216,0.06)" : "rgba(26,20,16,0.05)",
                      lineHeight: 1, marginBottom: "-1.5rem",
                      letterSpacing: "-0.02em",
                    }}>
                      {service.number}
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: service.accent, marginBottom: "0.5rem", fontWeight: 500 }}>
                      Practice Area {service.number}
                    </p>
                    <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.2vw, 3rem)", fontWeight: 700, color: service.text, lineHeight: 1.05, marginBottom: "0.6rem" }}>
                      {service.name}
                    </h2>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(1rem, 1.4vw, 1.15rem)", color: service.accent, lineHeight: 1.4, marginBottom: "2.5rem" }}>
                      {service.tagline}
                    </p>
                  </Reveal>

                  <Reveal direction="left" delay={0.15}>
                    <div style={{ borderTop: `1px solid ${service.light ? "rgba(245,237,216,0.15)" : "rgba(26,20,16,0.1)"}`, paddingTop: "1.5rem" }}>
                      <p style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: service.accent, marginBottom: "1rem", fontWeight: 500 }}>
                        What We Deliver
                      </p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                        {service.deliverables.map((d, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.2 + j * 0.07 }}
                            style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", listStyle: "none" }}
                          >
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: service.accent, flexShrink: 0, marginTop: "0.6rem" }} />
                            <span style={{ fontSize: "0.88rem", color: service.light ? "rgba(245,237,216,0.72)" : "rgba(26,20,16,0.62)", lineHeight: 1.65 }}>{d}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>

                {/* Right */}
                <div>
                  <Reveal direction="right" delay={0.1}>
                    <p style={{ fontSize: "1rem", lineHeight: 1.9, color: service.light ? "rgba(245,237,216,0.75)" : "rgba(26,20,16,0.65)", marginBottom: "3rem" }}>
                      {service.desc}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                      <motion.a
                        href="/contact"
                        style={{
                          display: "inline-block",
                          background: "transparent",
                          color: service.accent,
                          fontSize: "0.75rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          fontWeight: 500,
                          borderBottom: `1.5px solid ${service.accent}`,
                          paddingBottom: "0.2rem",
                        }}
                        whileHover={{ letterSpacing: "0.3em" }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        Start a Conversation →
                      </motion.a>

                      {/* Service number indicator */}
                      <p style={{ fontSize: "0.7rem", color: service.light ? "rgba(245,237,216,0.3)" : "rgba(26,20,16,0.2)", letterSpacing: "0.1em" }}>
                        {i + 1} of {SERVICES.length}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── CTA BAND ─────────────────────────────────── */}
      <section style={{ background: "#C8651A", padding: "6rem 4rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(245,237,216,0.6)", marginBottom: "1rem", fontWeight: 500 }}>
              Ready to Begin
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Not sure where to start?<br />We'll help you find out.
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(245,237,216,0.75)", marginBottom: "2.5rem" }}>
              Every engagement begins with a conversation. Tell us where your organisation is and where you want it to go — we'll tell you honestly how we can help.
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
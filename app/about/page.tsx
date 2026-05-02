"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/layout/Footer";

const EASE = [0.76, 0, 0.24, 1] as const;

// ── Scroll-reveal wrapper ────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"  ? { opacity: 0, x: -48 } :
    direction === "right" ? { opacity: 0, x:  48 } :
                            { opacity: 0, y:  48 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Section header ───────────────────────────────────────
function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p style={{
      fontFamily:    "var(--font-cormorant)",
      fontSize:      "0.7rem",
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color:         light ? "rgba(245,237,216,0.55)" : "#C8651A",
      marginBottom:  "0.8rem",
      fontWeight:    500,
    }}>
      {text}
    </p>
  );
}

// ── Data ─────────────────────────────────────────────────
const VALUES = [
  {
    name:  "Adinkrahene",
    value: "Leadership",
    desc:  "We believe genuine leadership is not a title bestowed but a gravity earned — through integrity, consistency, and the courage to make difficult decisions in service of those who follow.",
    color: "#C8651A",
  },
  {
    name:  "Nea Onnim",
    value: "Continuous Learning",
    desc:  "Every engagement is an opportunity to know more, understand deeper, and serve better. We hold ourselves to a standard of perpetual growth — because the organisations we serve deserve advisors who never stop learning.",
    color: "#3A7D6E",
  },
  {
    name:  "Agyindawuru",
    value: "Alertness",
    desc:  "We remain fully present — to the shifts in your industry, the undercurrents in your culture, the unspoken needs of your people. Alertness is not anxiety; it is the discipline of paying attention before it becomes necessary.",
    color: "#A83E10",
  },
  {
    name:  "Akoma",
    value: "Candour & Care",
    desc:  "We tell you what you need to hear, not just what you want to hear — delivered with genuine care for your success. Candour without compassion is cruelty; compassion without candour is cowardice. We choose both.",
    color: "#2D6459",
  },
];

const APPROACH = [
  {
    number: "01",
    title:  "Discover",
    desc:   "We begin by listening — deeply, without assumption. Every organisation has a unique context, history, and set of pressures. Before we offer a single recommendation, we immerse ourselves in yours.",
  },
  {
    number: "02",
    title:  "Diagnose",
    desc:   "We identify root causes, not just symptoms. Using structured frameworks and candid conversations, we map the landscape of your people challenges with precision and honesty.",
  },
  {
    number: "03",
    title:  "Design",
    desc:   "We co-create solutions tailored to your organisation — not templates lifted from a handbook. Every strategy, system, and intervention is built with your context, your culture, and your people in mind.",
  },
  {
    number: "04",
    title:  "Deliver & Sustain",
    desc:   "We implement with rigour and build internal capability so the change endures beyond our engagement. Our measure of success is not a delivered report — it is a transformed organisation.",
  },
];

const TEAM = [
  { name: "Team Member", role: "Managing Director",       initials: "MD" },
  { name: "Team Member", role: "HR Advisory Lead",        initials: "HR" },
  { name: "Team Member", role: "Business Advisory Lead",  initials: "BA" },
  { name: "Team Member", role: "Talent Acquisition Lead", initials: "TA" },
];

const PAT = [
  "a","c","b","d","a","c","b","d",
  "c","b","d","a","c","b","d","a",
  "b","d","a","c","b","d","a","c",
  "d","a","c","b","d","a","c","b",
  "a","c","b","d","a","c","b","d",
];
const COLORS: Record<string, string> = {
  a: "#C8651A", b: "#A83E10", c: "#3A7D6E", d: "#2D6459",
};

// ── Banner with internal parallax ───────────────────────
function HeroBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  return (
    <div
      ref={ref}
      style={{ position: "relative", height: "65vh", minHeight: "420px", overflow: "hidden" }}
    >
      {/* Parallax checkerboard */}
      <motion.div
        style={{
          position: "absolute", inset: "-10%",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows:    "repeat(5, 1fr)",
          y,
        }}
      >
        {PAT.map((p, i) => (
          <div key={i} style={{ background: COLORS[p] }} />
        ))}
      </motion.div>

      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        opacity: 0.4, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(26,20,16,0.78) 100%)",
      }} />

      {/* Text */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "2rem",
          opacity,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-cormorant)", fontSize: "0.72rem",
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500,
          }}
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 700, color: "#F5EDD8",
            lineHeight: 1.0, letterSpacing: "-0.01em",
          }}
        >
          Rooted in Culture.<br />
          <em style={{ color: "#C8651A" }}>Built for Results.</em>
        </motion.h1>
      </motion.div>
    </div>
  );
}

// ── Parallax image in section ────────────────────────────
function ParallaxWatermark({
  src,
  style,
  speed = 60,
}: {
  src: string;
  style: React.CSSProperties;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [top, setTop] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setTop(rect.top + window.scrollY);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const y = useTransform(
    scrollY,
    [top - 800, top + 800],
    [-speed, speed]
  );

  if (!mounted) return null;

  return (
    <motion.div
      ref={ref}
      style={{
        position:      "absolute",
        pointerEvents: "none",
        userSelect:    "none",
        ...style,
        y,
      }}
    >
      <img src={src} alt="" aria-hidden="true" style={{ width: "100%", display: "block" }} />
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div>

      {/* ── HERO BANNER ──────────────────────────────── */}
      <HeroBanner />

      {/* ── SECTION 1: OUR STORY (cream) ─────────────── */}
      <section style={{
        background: "#FDFAF5", minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "7rem 4rem", position: "relative", overflow: "clip",
      }}>
        <ParallaxWatermark
          src="/symbols/adinkrahene.png"
          style={{ right: "-5%", bottom: "-8%", width: "40%", opacity: 0.04, filter: "invert(1)" }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>

          {/* Pull quote */}
          <Reveal>
            <div style={{ borderLeft: "3px solid #C8651A", paddingLeft: "2rem", marginBottom: "5rem" }}>
              <p style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                fontWeight: 600, color: "#1A1410",
                lineHeight: 1.25, fontStyle: "italic", maxWidth: "780px",
              }}>
                "We exist because people are not resources to be managed —
                they are the very reason organisations exist at all."
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

            <div>
              <Reveal direction="left">
                <SectionLabel text="Who We Are" />
                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 700, color: "#1A1410",
                  lineHeight: 1.05, marginBottom: "1.5rem",
                }}>
                  Integrated HR Ghana
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.7)", marginBottom: "1.2rem" }}>
                  Integrated HR Ghana (IHR) is a bespoke Business and Human Resource Advisory firm based in Accra, Ghana. We were founded on a simple but radical belief — that the quality of an organisation's people strategy is the single greatest determinant of its long-term success.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.7)" }}>
                  We work with organisations across Ghana and West Africa to design and implement people management solutions that are not only strategically sound, but deeply human. We draw on global best practices and the rich wisdom of African leadership traditions — bringing both rigour and cultural intelligence to every engagement.
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal direction="right" delay={0.1}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.7)", marginBottom: "1.2rem" }}>
                  Our team brings together decades of experience across HR strategy, talent management, leadership development, organisational design, and business advisory. We have worked with organisations in financial services, telecommunications, healthcare, manufacturing, the public sector, and beyond.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.7)", marginBottom: "2.5rem" }}>
                  What sets us apart is not just what we know — it is how we work. We embed ourselves in the reality of your organisation. We speak plainly. We build relationships based on trust, not dependency. And we measure our success not by the quality of our reports, but by the transformation of your people.
                </p>

                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  {[
                    { value: "15+",  label: "Years of Experience" },
                    { value: "200+", label: "Clients Served" },
                    { value: "98%",  label: "Client Satisfaction" },
                    { value: "12",   label: "Industries Covered" },
                  ].map((stat, i) => (
                    <Reveal key={stat.label} delay={i * 0.08}>
                      <div style={{ borderTop: "2px solid #C8651A", paddingTop: "1rem" }}>
                        <p style={{
                          fontFamily: "var(--font-cormorant)", fontSize: "2.8rem",
                          fontWeight: 700, color: "#C8651A", lineHeight: 1, marginBottom: "0.3rem",
                        }}>
                          {stat.value}
                        </p>
                        <p style={{
                          fontSize: "0.68rem", letterSpacing: "0.15em",
                          textTransform: "uppercase", color: "rgba(26,20,16,0.45)",
                        }}>
                          {stat.label}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: VALUES (dark) ──────────────────── */}
      <section style={{
        background: "#1A1410", minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "7rem 4rem", position: "relative", overflow: "clip",
      }}>
        <ParallaxWatermark
          src="/symbols/agyindawuru.png"
          style={{ left: "-4%", top: "20%", width: "30%", opacity: 0.055 }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
          <Reveal>
            <SectionLabel text="What Guides Us" light />
            <h2 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 700, color: "#F5EDD8",
              lineHeight: 1.05, marginBottom: "4rem",
            }}>
              Our Values
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.value} delay={i * 0.1}>
                <motion.div
                  style={{
                    padding: "3rem", borderTop: `2px solid ${v.color}`,
                    background: "rgba(255,255,255,0.03)", height: "100%",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.07)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p style={{
                    fontFamily: "var(--font-cormorant)", fontSize: "0.65rem",
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: v.color, marginBottom: "0.5rem", fontWeight: 500,
                  }}>
                    {v.name}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                    fontWeight: 700, color: "#F5EDD8",
                    lineHeight: 1.05, marginBottom: "1rem",
                  }}>
                    {v.value}
                  </h3>
                  <p style={{
                    fontSize: "0.9rem", lineHeight: 1.8,
                    color: "rgba(245,237,216,0.62)", fontWeight: 300,
                  }}>
                    {v.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: APPROACH (amber) ──────────────── */}
      <section style={{
        background: "#C8651A", minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "7rem 4rem", position: "relative", overflow: "clip",
      }}>
        <ParallaxWatermark
          src="/symbols/nea-onnim.png"
          style={{ right: "-3%", bottom: "-8%", width: "34%", opacity: 0.08, filter: "brightness(10)" }}
        />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

            <div>
              <Reveal direction="left">
                <SectionLabel text="How We Work" light />
                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 700, color: "#F5EDD8",
                  lineHeight: 1.0, marginBottom: "1.5rem",
                }}>
                  Our Proven<br />Approach
                </h2>
                <p style={{
                  fontSize: "0.95rem", lineHeight: 1.85,
                  color: "rgba(245,237,216,0.75)", fontWeight: 300,
                }}>
                  Every engagement begins with listening. We don't arrive with pre-built solutions — we arrive with curiosity, expertise, and a commitment to what truly works for your specific organisation and people.
                </p>
              </Reveal>
            </div>

            <ul style={{ display: "flex", flexDirection: "column" }}>
              {APPROACH.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.1}>
                  <motion.li
                    style={{
                      display: "flex", gap: "1.5rem", alignItems: "flex-start",
                      padding: "1.5rem 0",
                      borderBottom: "1px solid rgba(245,237,216,0.2)",
                      listStyle: "none",
                    }}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span style={{
                      fontFamily: "var(--font-cormorant)", fontSize: "2rem",
                      fontWeight: 300, color: "rgba(245,237,216,0.3)",
                      lineHeight: 1.2, minWidth: "3rem",
                    }}>
                      {step.number}
                    </span>
                    <div>
                      <p style={{
                        fontSize: "1rem", fontWeight: 500,
                        color: "#F5EDD8", marginBottom: "0.4rem", letterSpacing: "0.02em",
                      }}>
                        {step.title}
                      </p>
                      <p style={{
                        fontSize: "0.88rem", lineHeight: 1.75,
                        color: "rgba(245,237,216,0.7)", fontWeight: 300,
                      }}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TEAM (cream) ───────────────────── */}
      <section style={{
        background: "#FDFAF5", minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "7rem 4rem", position: "relative", overflow: "clip",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>

          <Reveal>
            <SectionLabel text="The People Behind IHR" />
            <h2 style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 700, color: "#1A1410",
              lineHeight: 1.05, marginBottom: "4rem",
            }}>
              Our Team
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }}>
            {TEAM.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {/* Photo placeholder */}
                  <div style={{
                    width: "100%", aspectRatio: "3/4",
                    background: "linear-gradient(135deg, #E8D9BB 0%, #D4C4A0 100%)",
                    marginBottom: "1.2rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "clip",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-cormorant)", fontSize: "4rem",
                      fontWeight: 300, color: "rgba(200,101,26,0.2)", userSelect: "none",
                    }}>
                      {member.initials}
                    </span>
                    <div style={{
                      position: "absolute", bottom: "1rem", left: "1rem",
                      background: "rgba(26,20,16,0.55)", padding: "0.3rem 0.7rem",
                      backdropFilter: "blur(4px)",
                    }}>
                      <p style={{
                        fontSize: "0.58rem", letterSpacing: "0.2em",
                        textTransform: "uppercase", color: "rgba(245,237,216,0.7)",
                      }}>
                        Photo coming soon
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-cormorant)", fontSize: "1.2rem",
                    fontWeight: 600, color: "#1A1410", marginBottom: "0.2rem",
                  }}>
                    {member.name}
                  </p>
                  <p style={{
                    fontSize: "0.72rem", letterSpacing: "0.12em",
                    textTransform: "uppercase", color: "#C8651A", fontWeight: 400,
                  }}>
                    {member.role}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div style={{
              marginTop: "5rem", textAlign: "center",
              paddingTop: "3rem", borderTop: "1px solid rgba(26,20,16,0.1)",
            }}>
              <p style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 700, color: "#1A1410",
                marginBottom: "1rem", letterSpacing: "-0.01em",
              }}>
                Ready to transform your people strategy?
              </p>
              <p style={{
                fontSize: "0.95rem", color: "rgba(26,20,16,0.55)",
                lineHeight: 1.7, maxWidth: "480px",
                margin: "0 auto 2rem",
              }}>
                Let's start with a conversation. No obligation — just clarity on what's possible for your organisation.
              </p>
              <motion.a
                href="/contact"
                style={{
                  display: "inline-block", background: "#1A1410",
                  color: "#F5EDD8", padding: "1rem 2.8rem",
                  fontSize: "0.75rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", textDecoration: "none", fontWeight: 400,
                }}
                whileHover={{ background: "#C8651A" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                Let's Talk
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <Footer />

    </div>
  );
}
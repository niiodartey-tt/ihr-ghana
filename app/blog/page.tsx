"use client";

import { useState, useRef } from "react";
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

const CATEGORIES = [
  {
    name:    "Leadership",
    desc:    "What it takes to lead well in African organisations — and why the conventional wisdom often falls short.",
    symbol:  "/symbols/adinkrahene.png",
    accent:  "#C8651A",
    topics:  ["Succession Planning", "Leadership Identity", "Executive Presence", "Building Trust at Scale"],
  },
  {
    name:    "HR Practice",
    desc:    "Practical, candid perspectives on the craft of human resource management — from policy to performance.",
    symbol:  "/symbols/nea-onnim.png",
    accent:  "#3A7D6E",
    topics:  ["Performance Management", "Talent Acquisition", "HR Strategy", "Compensation & Reward"],
  },
  {
    name:    "People & Culture",
    desc:    "The invisible forces that shape how organisations actually work — and how to shape them deliberately.",
    symbol:  "/symbols/agyindawuru.png",
    accent:  "#A83E10",
    topics:  ["Culture Change", "Employee Engagement", "Psychological Safety", "Diversity & Inclusion"],
  },
  {
    name:    "Ghana Business",
    desc:    "The intersection of business strategy and people management in the Ghanaian and West African context.",
    symbol:  "/symbols/adinkrahene.png",
    accent:  "#2D6459",
    topics:  ["Labour Law Updates", "Local Talent Market", "SME Growth", "Corporate Governance"],
  },
];

// ── Email capture form ────────────────────────────────────
function EmailCapture() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    // TODO: Wire up to Mailchimp / Resend mailing list when ready
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <div style={{ width: "32px", height: "1.5px", background: "#C8651A" }} />
        <p style={{ fontSize: "0.92rem", color: "#1A1410" }}>
          You're on the list. We'll be in touch when we publish.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "flex-end", gap: "0", maxWidth: "480px" }}>
      <div style={{ flex: 1, borderBottom: "1.5px solid rgba(26,20,16,0.2)", paddingBottom: "0.6rem" }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            background: "transparent", border: "none",
            outline: "none", width: "100%",
            fontSize: "0.95rem", color: "#1A1410",
            padding: "0.4rem 0",
          }}
        />
      </div>
      <motion.button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: "#1A1410", color: "#F5EDD8",
          border: "none", cursor: "pointer",
          padding: "0.75rem 1.8rem",
          fontSize: "0.72rem", letterSpacing: "0.2em",
          textTransform: "uppercase", fontWeight: 500,
          flexShrink: 0,
          opacity: status === "sending" ? 0.6 : 1,
        }}
        whileHover={status !== "sending" ? { background: "#C8651A" } : {}}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {status === "sending" ? "..." : "Notify Me"}
      </motion.button>
    </form>
  );
}

export default function BlogPage() {
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
            Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.0, letterSpacing: "-0.01em" }}
          >
            Ideas Worth<br />
            <em style={{ color: "#C8651A" }}>Acting On.</em>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── EDITORIAL STATEMENT ──────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "7rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/nea-onnim.png"
          style={{ right: "-4%", top: "5%", width: "35%", opacity: 0.04 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

            <div>
              <Reveal direction="left">
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Coming Soon
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  Candid thinking on people, leadership, and the business of building great organisations.
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "1.2rem" }}>
                  The IHR Insights journal is where we share what we are thinking — not polished press releases or self-promotional case studies, but genuine perspectives on the challenges facing organisations and the people who lead them.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "2.5rem" }}>
                  We write for leaders who want to think more clearly, HR professionals who want to practise more boldly, and anyone building organisations in Ghana and across West Africa who is willing to question the conventional wisdom.
                </p>

                {/* Email capture */}
                <div>
                  <p style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,20,16,0.45)", marginBottom: "1rem", fontWeight: 500 }}>
                    Be the first to receive our insights
                  </p>
                  <EmailCapture />
                </div>
              </Reveal>
            </div>

            {/* Right — publication details */}
            <div>
              <Reveal direction="right" delay={0.1}>
                <div style={{ borderLeft: "3px solid #C8651A", paddingLeft: "2rem", marginBottom: "3rem" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 600, color: "#1A1410", lineHeight: 1.3, fontStyle: "italic" }}>
                    "The organisations that think clearly about their people will outperform those that don't. Every time. Without exception."
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { label: "Frequency",   value: "Monthly — quality over quantity" },
                    { label: "Format",      value: "Long-form essays, practical guides, and candid perspectives" },
                    { label: "Audience",    value: "Leaders, HR professionals, and founders building in West Africa" },
                    { label: "First Issue", value: "Coming soon — sign up to be notified" },
                  ].map(item => (
                    <div key={item.label} style={{ borderTop: "1px solid rgba(26,20,16,0.08)", paddingTop: "1rem" }}>
                      <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,20,16,0.38)", marginBottom: "0.3rem", fontWeight: 500 }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: "0.92rem", color: "#1A1410", lineHeight: 1.6 }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY TEASES ──────────────────────────── */}
      <section style={{ background: "#1A1410", padding: "7rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/adinkrahene.png"
          style={{ left: "-4%", bottom: "-5%", width: "32%", opacity: 0.06 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
              What We'll Cover
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "4rem" }}>
              Four lenses.<br />One commitment to clarity.
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}>
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 0.1}>
                <motion.div
                  style={{
                    padding: "3rem", borderTop: `2px solid ${cat.accent}`,
                    background: "rgba(255,255,255,0.03)",
                    transition: "background 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.07)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: cat.accent, marginBottom: "0.5rem", fontWeight: 500 }}>
                    {cat.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 600, color: "#F5EDD8", lineHeight: 1.2, marginBottom: "1rem" }}>
                    {cat.desc}
                  </p>

                  {/* Topic tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                    {cat.topics.map(topic => (
                      <span
                        key={topic}
                        style={{
                          fontSize: "0.72rem", padding: "0.3rem 0.8rem",
                          border: `1px solid ${cat.accent}`,
                          color: cat.accent, letterSpacing: "0.05em",
                          opacity: 0.7,
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── IN THE MEANTIME ──────────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  In the Meantime
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05, marginBottom: "1.2rem" }}>
                  The best insight starts with a conversation.
                </h2>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.6)", marginBottom: "2rem" }}>
                  While we're preparing our first pieces, the most valuable thinking we can offer is still a direct conversation about your specific situation. No generic advice — just honest, experienced counsel tailored to where you are.
                </p>
                <motion.a
                  href="/contact"
                  style={{
                    display: "inline-block", background: "#1A1410",
                    color: "#F5EDD8", padding: "1rem 2.5rem",
                    fontSize: "0.75rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", textDecoration: "none", fontWeight: 500,
                  }}
                  whileHover={{ background: "#C8651A" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  Let's Talk
                </motion.a>
              </div>

              {/* Services quick links */}
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "1.5rem", fontWeight: 500 }}>
                  Explore Our Services
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    { label: "Talent Solutions",                href: "/services#talent-solutions" },
                    { label: "HR Strategy & Organisation Design", href: "/services#hr-strategy-organisation" },
                    { label: "Leadership & Learning",           href: "/services#leadership-learning" },
                    { label: "Performance & Reward",            href: "/services#performance-reward" },
                    { label: "Change Management",               href: "/services#change-management" },
                    { label: "Business Advisory",               href: "/services#business-advisory" },
                  ].map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "1rem 0",
                        borderBottom: "1px solid rgba(26,20,16,0.08)",
                        textDecoration: "none",
                        color: "#1A1410",
                        fontSize: "0.9rem",
                      }}
                      whileHover={{ x: 6, color: "#C8651A" }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <span>{link.label}</span>
                      <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>→</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
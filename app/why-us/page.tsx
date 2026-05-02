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

const DICE = [
  {
    letter:   "D",
    word:     "Dependable",
    tagline:  "We finish what we start. Every time.",
    desc:     "Dependability is not about showing up — it is about showing up prepared, committed, and accountable. At IHR, we don't just listen to you; we seek to understand your business, your operating environment, and the pressures your people are under. We work hand-in-hand with you so that the solutions we deliver are long-term, consistent in quality, and genuinely tailored to your specific need. When we make a commitment, we follow through — not because it is required, but because your trust is the foundation everything else is built on.",
    forYou:   "You will never wonder where we are or what we are doing. We keep you informed, we meet our timelines, and we take full accountability for the quality of our work.",
    bg:       "#FDFAF5",
    text:     "#1A1410",
    accent:   "#C8651A",
    light:    false,
    watermark: "/symbols/adinkrahene.png",
    wmStyle:  { right: "-4%", bottom: "-5%", width: "38%", opacity: 0.05 },
  },
  {
    letter:   "I",
    word:     "Integrity",
    tagline:  "We tell you what you need to hear.",
    desc:     "Integrity, for us, is not a value statement on a wall — it is a daily practice. It means being open and honest even when the truth is uncomfortable. It means following through on our commitments even when it is inconvenient. It means maintaining complete confidentiality with everything you share with us. And it means never tailoring our advice to what we think you want to hear, because you deserve counsel that actually serves your interests — not ours.",
    forYou:   "You will always receive our honest assessment. We will tell you when a proposed approach has risks. We will tell you when we think a different path is better. And we will never overpromise what we can deliver.",
    bg:       "#1A1410",
    text:     "#F5EDD8",
    accent:   "#C8651A",
    light:    true,
    watermark: "/symbols/nea-onnim.png",
    wmStyle:  { left: "-3%", top: "15%", width: "34%", opacity: 0.08 },
  },
  {
    letter:   "C",
    word:     "Creativity",
    tagline:  "We don't accept the status quo.",
    desc:     "Creativity, in our world, is not about being clever — it is about being curious. We nurture creative thinking that genuinely adds value to your business. We dare to set and exceed our own high standards, constantly raising the bar for what HR and business advisory services can achieve. We don't rest on our oars or accept 'that's the way things have always been done' as an answer. Every client engagement is an opportunity to think differently, to bring something new, and to find solutions that are not just effective, but genuinely inventive.",
    forYou:   "You will receive solutions designed specifically for your context — not templates recycled from a previous client. We approach every engagement with fresh eyes and genuine intellectual curiosity.",
    bg:       "#C8651A",
    text:     "#F5EDD8",
    accent:   "#F5EDD8",
    light:    true,
    watermark: "/symbols/agyindawuru.png",
    wmStyle:  { right: "-3%", bottom: "-8%", width: "36%", opacity: 0.1, filter: "brightness(10)" },
  },
  {
    letter:   "E",
    word:     "Exceptionalism",
    tagline:  "Good enough is never good enough.",
    desc:     "We go above and beyond in our quest for the continuous development of our skills, our expertise, and our understanding of the organisations we serve. Exceptionalism, for us, means following up on your business's progress even after our formal engagement ends. It means measuring our success not by the quality of the report we delivered, but by the actual improvement in your organisation's performance. It means being invested in your outcomes — not just your outputs. This is the standard we hold ourselves to, and the standard we believe you deserve.",
    forYou:   "Our engagement doesn't end when the final report is submitted. We follow up. We check in. We want to know that what we recommended actually worked — and if it didn't, we want to know that too.",
    bg:       "#3A7D6E",
    text:     "#F5EDD8",
    accent:   "#F5EDD8",
    light:    true,
    watermark: "/symbols/adinkrahene.png",
    wmStyle:  { right: "-5%", top: "10%", width: "34%", opacity: 0.08 },
  },
];

const DIFFERENTIATORS = [
  {
    number: "01",
    title:  "Deeply Local. Genuinely Global.",
    desc:   "We operate with what we call a 'glocal' mindset — the deep knowledge of a local firm combined with the standards and thinking of a world-class advisory practice. We understand the Ghanaian business environment, its labour laws, its cultural dynamics, and its talent landscape in a way that no international firm parachuting in can replicate.",
  },
  {
    number: "02",
    title:  "Bespoke by Design.",
    desc:   "We do not have off-the-shelf solutions. Every engagement is designed from the ground up to address your specific context, your specific people, and your specific ambitions. Our solutions are people-centred, client-specific, and need-driven — because a generic approach to complex human problems is not just unhelpful, it is irresponsible.",
  },
  {
    number: "03",
    title:  "Outcomes, Not Outputs.",
    desc:   "Many consultants deliver reports. We deliver results. We measure our success by what changes in your organisation after we leave — not by the thickness of the document we handed over. This means we stay engaged, we follow up, and we take genuine accountability for the recommendations we make.",
  },
];

export default function WhyUsPage() {
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
            Our Edge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.0, letterSpacing: "-0.01em" }}
          >
            Why IHR.<br />
            <em style={{ color: "#1A3330" }}>Why It Matters.</em>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── OPENING STATEMENT ────────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "6rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Why Choose IHR
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05 }}>
                  We transform your challenges into opportunities.
                </h2>
              </div>
              <div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "1.2rem" }}>
                  At IHR, we are driven by a single aim — to help you turn the challenges and risks facing your organisation into genuine, lasting opportunities. We seek to help you achieve operational excellence, enhance customer satisfaction, and build a people strategy that becomes one of your most powerful competitive advantages.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)" }}>
                  Our edge is built on four core values — what we call D.I.C.E. Together, they define not just how we work, but who we are.
                </p>
              </div>
            </div>
          </Reveal>

          {/* D.I.C.E index */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", marginTop: "4rem", borderTop: "1px solid rgba(26,20,16,0.1)" }}>
            {DICE.map((d, i) => (
              <Reveal key={d.letter} delay={i * 0.08}>
                <a
                  href={`#dice-${d.letter.toLowerCase()}`}
                  style={{
                    display: "block", padding: "2rem 1.5rem",
                    borderRight: i < 3 ? "1px solid rgba(26,20,16,0.1)" : "none",
                    textDecoration: "none",
                    transition: "background 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,101,26,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.5rem", fontWeight: 700, color: "#C8651A", lineHeight: 1, marginBottom: "0.5rem" }}>
                    {d.letter}
                  </p>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 600, color: "#1A1410" }}>
                    {d.word}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(26,20,16,0.45)", marginTop: "0.3rem", lineHeight: 1.5 }}>
                    {d.tagline}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── D.I.C.E STICKY SECTIONS ──────────────────── */}
      <div style={{ position: "relative" }}>
        {DICE.map((item, i) => (
          <section
            key={item.letter}
            id={`dice-${item.letter.toLowerCase()}`}
            style={{
              background: item.bg,
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
            <Watermark src={item.watermark} style={item.wmStyle} />

            <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

                {/* Left — letter, word, tagline */}
                <div>
                  <Reveal direction="left">
                    <p style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "clamp(8rem, 18vw, 16rem)",
                      fontWeight: 700,
                      color: item.light ? "rgba(245,237,216,0.06)" : "rgba(26,20,16,0.05)",
                      lineHeight: 1,
                      marginBottom: "-2rem",
                      letterSpacing: "-0.04em",
                    }}>
                      {item.letter}
                    </p>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: item.accent, marginBottom: "0.5rem", fontWeight: 500 }}>
                      Core Value — {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 700, color: item.text, lineHeight: 1.0, marginBottom: "0.8rem" }}>
                      {item.word}
                    </h2>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: item.accent, lineHeight: 1.4, marginBottom: "3rem" }}>
                      {item.tagline}
                    </p>
                  </Reveal>

                  {/* What this means for you */}
                  <Reveal direction="left" delay={0.15}>
                    <div style={{ borderTop: `1px solid ${item.light ? "rgba(245,237,216,0.15)" : "rgba(26,20,16,0.1)"}`, paddingTop: "1.5rem" }}>
                      <p style={{ fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", color: item.accent, marginBottom: "0.8rem", fontWeight: 500 }}>
                        What This Means For You
                      </p>
                      <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: item.light ? "rgba(245,237,216,0.72)" : "rgba(26,20,16,0.62)", fontStyle: "italic" }}>
                        {item.forYou}
                      </p>
                    </div>
                  </Reveal>
                </div>

                {/* Right — full description */}
                <div>
                  <Reveal direction="right" delay={0.1}>
                    <p style={{ fontSize: "1rem", lineHeight: 1.9, color: item.light ? "rgba(245,237,216,0.75)" : "rgba(26,20,16,0.65)", marginBottom: "3rem" }}>
                      {item.desc}
                    </p>

                    <motion.a
                      href="/contact"
                      style={{
                        display: "inline-block",
                        color: item.accent,
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        fontWeight: 500,
                        borderBottom: `1.5px solid ${item.accent}`,
                        paddingBottom: "0.2rem",
                      }}
                      whileHover={{ letterSpacing: "0.3em" }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      Work With Us →
                    </motion.a>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── DIFFERENTIATORS ───────────────────────────── */}
      <section style={{ background: "#1A1410", padding: "7rem 4rem", overflow: "clip", position: "relative" }}>
        <Watermark
          src="/symbols/nea-onnim.png"
          style={{ right: "-4%", bottom: "-5%", width: "32%", opacity: 0.06 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
              What Sets Us Apart
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "4rem" }}>
              Three things that make<br />the difference.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.number} delay={i * 0.1}>
                <motion.div
                  style={{
                    display: "grid", gridTemplateColumns: "80px 1fr",
                    gap: "2rem", alignItems: "start",
                    padding: "2.5rem 0",
                    borderBottom: "1px solid rgba(245,237,216,0.08)",
                  }}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 300, color: "rgba(245,237,216,0.2)", lineHeight: 1 }}>
                    {d.number}
                  </p>
                  <div>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem, 2vw, 1.8rem)", fontWeight: 600, color: "#F5EDD8", marginBottom: "0.6rem", lineHeight: 1.2 }}>
                      {d.title}
                    </p>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(245,237,216,0.58)", fontWeight: 300 }}>
                      {d.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────── */}
      <section style={{ background: "#C8651A", padding: "6rem 4rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(245,237,216,0.6)", marginBottom: "1rem", fontWeight: 500 }}>
              Experience the Difference
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Ready to work with a partner<br />who is genuinely invested in you?
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(245,237,216,0.75)", marginBottom: "2.5rem" }}>
              Every engagement begins with a conversation. No pressure, no pitch — just an honest discussion about where your organisation is and where you want it to go.
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
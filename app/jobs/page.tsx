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

const JOBS = [
  {
    id:       "chief-finance-officer",
    title:    "Chief Finance Officer",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Lead financial decision-making and provide strategic financial input to achieve business goals. Responsible for direction and management of the Finance and Accounting team, advising on long-term business growth and investment strategies.",
    requirements: [
      "An MBA in Finance from a recognised university",
      "A Bachelor's Degree in a relevant field",
      "Minimum 5 years in a Senior Management role in a reputable institution",
      "Professional certifications in ITIL, CISA, PMP are an advantage",
    ],
  },
  {
    id:       "head-information-systems",
    title:    "Head of Information Systems Department",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Plan, direct and manage the Information Systems Department to develop and implement efficient computer operations meeting current and future decision-making requirements.",
    requirements: [
      "Minimum BSc in Information Technology, Computer Science or related field",
      "10 years relevant post-qualification working experience",
      "Proven working knowledge of Enterprise Architecture",
      "Familiarity with leading Enterprise technologies",
    ],
  },
  {
    id:       "head-alternative-distribution",
    title:    "Head, Alternative Distribution",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Lead and manage the alternative distribution team to realise the full potential of the Company's alternative distribution channels and overall marketing strategy.",
    requirements: [
      "Bachelor's Degree in relevant field; Master's Degree is an advantage",
      "Minimum 10 years post-qualification experience, 5 years in Senior Management",
      "Strong knowledge of the local insurance industry",
      "Experience in e-business and leading payment technologies",
    ],
  },
  {
    id:       "risk-manager",
    title:    "Risk Manager",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Develop and implement risk management policies covering all aspects of the risk function including implementation of risk management systems to identify, assess, measure, monitor and report risk.",
    requirements: [
      "Bachelor's Degree in Risk Management or relevant field",
      "Master's Degree or professional qualification in Risk Management",
      "Minimum 5 years post-qualification experience in risk management",
      "Demonstrable experience in developing risk management systems",
    ],
  },
  {
    id:       "investment-manager",
    title:    "Investment Manager",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Responsible for implementation and maintenance of the Company's Investment Policy and the provision of sound investment and financial advice to the Investment Committee.",
    requirements: [
      "Bachelor's Degree in Finance, Economics, Mathematics or related discipline",
      "A certification in Securities from the Ghana Stock Exchange",
      "Post-Graduate qualification in Investment Analysis & Management",
      "Minimum 5 years post-qualification experience",
    ],
  },
  {
    id:       "assistant-country-secretary",
    title:    "Assistant Country Secretary",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Responsible for effective and efficient administration of the Company, particularly board procedures and ensuring compliance with all applicable regulations and legislation.",
    requirements: [
      "An LLB/BA Law from a recognised university plus BL",
      "Professional Law qualification from a recognised Law School",
      "Minimum 7 years demonstrable working experience in legal practice",
      "Member of the Ghana Bar Association in good standing",
    ],
  },
  {
    id:       "compliance-officer",
    title:    "Compliance Officer",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Manage implementation of all aspects of the compliance function ensuring all functional areas are fully conversant with and adhere to compliance standards.",
    requirements: [
      "A full or partial qualification from the Institute of Chartered Secretaries and Administrators UK (ICSA, UK)",
      "Minimum 3 years working experience in company secretarial work",
      "Good communication and interpersonal skills",
      "Ability to work under pressure with good organisational and planning skills",
    ],
  },
  {
    id:       "assistant-lawyer",
    title:    "Assistant Lawyer",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Assist the Head of Legal in the discharge of the legal function for and on behalf of the Company, providing timely and practicable legal advice.",
    requirements: [
      "An LLB/BA Law from a recognised university",
      "Minimum 3 years working experience in legal practice",
      "Excellent communication, organisational and presentation skills",
      "Proficiency in Microsoft Office Suite",
    ],
  },
  {
    id:       "transport-officer",
    title:    "Transport Officer",
    industry: "Financial Services — Insurance",
    location: "Accra, Ghana",
    type:     "Full-time",
    closing:  "6th September 2019",
    summary:  "Responsible for planning, managing and coordinating all transport matters to facilitate the Company's operations.",
    requirements: [
      "A professional certification in Transport Management or Certificate in Automobile Engineering",
      "Minimum 5 years work experience in Transport Management",
      "A valid Driver's License",
      "Demonstrable knowledge of transport management best practices",
    ],
  },
];

const VALUES_IHR = [
  {
    title: "Candour",
    desc:  "We say what we think. We expect the same from the people we work with.",
  },
  {
    title: "Curiosity",
    desc:  "We ask questions before we offer answers. We reward intellectual honesty.",
  },
  {
    title: "Craft",
    desc:  "We take our work seriously. Good enough is never good enough here.",
  },
  {
    title: "Care",
    desc:  "We are genuinely invested in each other's growth and wellbeing.",
  },
];

// ── Job card ─────────────────────────────────────────────
function JobCard({ job }: { job: typeof JOBS[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      style={{
        borderTop:  "1px solid rgba(26,20,16,0.1)",
        padding:    "0",
        overflow:   "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width:      "100%",
          background: "none",
          border:     "none",
          cursor:     "pointer",
          padding:    "1.8rem 0",
          textAlign:  "left",
          display:    "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap:        "2rem",
        }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 700, color: "#1A1410", marginBottom: "0.3rem" }}>
            {job.title}
          </p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(26,20,16,0.45)", letterSpacing: "0.05em" }}>{job.industry}</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(26,20,16,0.45)", letterSpacing: "0.05em" }}>·</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(26,20,16,0.45)", letterSpacing: "0.05em" }}>{job.location}</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(26,20,16,0.45)", letterSpacing: "0.05em" }}>·</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(26,20,16,0.45)", letterSpacing: "0.05em" }}>{job.type}</span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ fontSize: "1.5rem", color: "#C8651A", lineHeight: 1, flexShrink: 0 }}
        >
          +
        </motion.span>
      </button>

      {/* Expanded content */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ paddingBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "0.8rem", fontWeight: 500 }}>
              Role Summary
            </p>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(26,20,16,0.65)", marginBottom: "1.5rem" }}>
              {job.summary}
            </p>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "0.5rem", fontWeight: 500 }}>
              Closing Date
            </p>
            <p style={{ fontSize: "0.88rem", color: "#A83E10" }}>
              {job.closing}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "0.8rem", fontWeight: 500 }}>
              Key Requirements
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {job.requirements.map((req, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", listStyle: "none" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C8651A", flexShrink: 0, marginTop: "0.55rem" }} />
                  <span style={{ fontSize: "0.88rem", color: "rgba(26,20,16,0.65)", lineHeight: 1.65 }}>{req}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href="mailto:ask@ihrgh.com?subject=Application — {job.title}"
              style={{
                display: "inline-block", marginTop: "1.5rem",
                background: "#1A1410", color: "#F5EDD8",
                padding: "0.8rem 2rem",
                fontSize: "0.72rem", letterSpacing: "0.2em",
                textTransform: "uppercase", textDecoration: "none", fontWeight: 500,
              }}
              whileHover={{ background: "#C8651A" }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              Apply Now →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function JobsPage() {
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
            Join Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.0, letterSpacing: "-0.01em" }}
          >
            Build Something<br />
            <em style={{ color: "#C8651A" }}>Worth Building.</em>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── WORK AT IHR ──────────────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "7rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/adinkrahene.png"
          style={{ right: "-4%", bottom: "-5%", width: "36%", opacity: 0.05 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div>
              <Reveal direction="left">
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Work at IHR
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  We're looking for people who think deeply and work with care.
                </h2>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "1.2rem" }}>
                  IHR is a small, high-calibre team. We don't hire for roles — we hire for potential, judgment, and the kind of character that makes an organisation genuinely better. If you are the kind of person who thinks carefully before speaking, who takes ownership without being asked, and who finds satisfaction in doing difficult work well, we would like to know you.
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "rgba(26,20,16,0.65)", marginBottom: "2.5rem" }}>
                  We don't always have open positions, but we are always interested in exceptional people. Send us your CV and a note about what drives you — we read everything.
                </p>

                <motion.a
                  href="mailto:ask@ihrgh.com?subject=Expression of Interest — IHR Team"
                  style={{
                    display: "inline-block", background: "#1A1410",
                    color: "#F5EDD8", padding: "1rem 2.5rem",
                    fontSize: "0.75rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", textDecoration: "none", fontWeight: 500,
                  }}
                  whileHover={{ background: "#C8651A" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  Express Interest →
                </motion.a>
              </Reveal>
            </div>

            {/* Values */}
            <div>
              <Reveal direction="right" delay={0.1}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "1.5rem", fontWeight: 500 }}>
                  What We Value in People
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {VALUES_IHR.map((v, i) => (
                    <motion.div
                      key={v.title}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                      style={{ padding: "1.5rem 0", borderBottom: "1px solid rgba(26,20,16,0.08)", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}
                    >
                      <div style={{ width: "2px", height: "100%", background: "#C8651A", flexShrink: 0, minHeight: "3rem", alignSelf: "stretch" }} />
                      <div>
                        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 700, color: "#1A1410", marginBottom: "0.3rem" }}>{v.title}</p>
                        <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(26,20,16,0.55)" }}>{v.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRENT VACANCIES ────────────────────────── */}
      <section style={{ background: "#1A1410", padding: "7rem 4rem", position: "relative", overflow: "clip" }}>
        <Watermark
          src="/symbols/agyindawuru.png"
          style={{ left: "-3%", top: "10%", width: "28%", opacity: 0.07 }}
        />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Client Vacancies
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05 }}>
                  Current Openings
                </h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.82rem", color: "rgba(245,237,216,0.4)", lineHeight: 1.6 }}>
                  Roles recruited by IHR on behalf of<br />a leading financial services organisation in Ghana.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Job listings */}
          <div>
            {JOBS.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.04}>
                <div style={{ color: "#F5EDD8" }}>
                  <motion.div
                    layout
                    style={{
                      borderTop: "1px solid rgba(245,237,216,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <JobCardDark job={job} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid rgba(245,237,216,0.1)" }} />
          </div>

          <Reveal delay={0.2}>
            <p style={{ fontSize: "0.82rem", color: "rgba(245,237,216,0.3)", marginTop: "2.5rem", lineHeight: 1.7 }}>
              To apply, send your CV and a cover letter to{" "}
              <a href="mailto:ask@ihrgh.com" style={{ color: "#C8651A", textDecoration: "none" }}>ask@ihrgh.com</a>
              {" "}with the role title as the subject line.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Dark variant job card ─────────────────────────────────
function JobCardDark({ job }: { job: typeof JOBS[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout style={{ overflow: "hidden" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%", background: "none", border: "none",
          cursor: "pointer", padding: "1.8rem 0", textAlign: "left",
          display: "grid", gridTemplateColumns: "1fr auto",
          alignItems: "center", gap: "2rem",
        }}
      >
        <div>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", fontWeight: 700, color: "#F5EDD8", marginBottom: "0.3rem" }}>
            {job.title}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(245,237,216,0.35)", letterSpacing: "0.05em" }}>{job.industry}</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(245,237,216,0.35)" }}>·</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(245,237,216,0.35)", letterSpacing: "0.05em" }}>{job.location}</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(245,237,216,0.35)" }}>·</span>
            <span style={{ fontSize: "0.72rem", color: "rgba(245,237,216,0.35)", letterSpacing: "0.05em" }}>{job.type}</span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ fontSize: "1.5rem", color: "#C8651A", lineHeight: 1, flexShrink: 0 }}
        >
          +
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ paddingBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,237,216,0.35)", marginBottom: "0.8rem", fontWeight: 500 }}>
              Role Summary
            </p>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(245,237,216,0.62)", marginBottom: "1.5rem" }}>
              {job.summary}
            </p>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,237,216,0.35)", marginBottom: "0.5rem", fontWeight: 500 }}>
              Closing Date
            </p>
            <p style={{ fontSize: "0.88rem", color: "#C8651A" }}>
              {job.closing}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,237,216,0.35)", marginBottom: "0.8rem", fontWeight: 500 }}>
              Key Requirements
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {job.requirements.map((req, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", listStyle: "none" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C8651A", flexShrink: 0, marginTop: "0.55rem" }} />
                  <span style={{ fontSize: "0.88rem", color: "rgba(245,237,216,0.62)", lineHeight: 1.65 }}>{req}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href={`mailto:ask@ihrgh.com?subject=Application — ${job.title}`}
              style={{
                display: "inline-block", marginTop: "1.5rem",
                background: "#C8651A", color: "#F5EDD8",
                padding: "0.8rem 2rem",
                fontSize: "0.72rem", letterSpacing: "0.2em",
                textTransform: "uppercase", textDecoration: "none", fontWeight: 500,
              }}
              whileHover={{ background: "#F5EDD8", color: "#1A1410" }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              Apply Now →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
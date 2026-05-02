"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

const PAT = ["a","c","b","d","a","c","b","d","c","b","d","a","c","b","d","a","b","d","a","c","b","d","a","c","d","a","c","b","d","a","c","b","a","c","b","d","a","c","b","d"];
const COLORS: Record<string, string> = { a: "#C8651A", b: "#A83E10", c: "#3A7D6E", d: "#2D6459" };

const SERVICES = [
  "Talent Solutions",
  "HR Strategy & Organisation Design",
  "Leadership & Learning",
  "Performance & Reward",
  "Change Management",
  "Business Advisory",
  "General Enquiry",
];

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "ask@ihrgh.com",
    href:  "mailto:ask@ihrgh.com",
  },
  {
    label: "Phone",
    value: "+233 570 002 616",
    href:  "tel:+233570002616",
  },
  {
    label: "Address",
    value: "Hse #359/1, Nii Nortey Omaboe St, Osu, Accra, Ghana",
    href:  "https://maps.google.com/?q=Osu,Accra,Ghana",
  },
  {
    label: "Office Hours",
    value: "Monday – Friday: 8:00 – 17:00",
    href:  null,
  },
];

// ── Input component ──────────────────────────────────────
function Field({
  label, type = "text", name, value, onChange, required = false, placeholder = "",
}: {
  label: string; type?: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = focused ? "#C8651A" : "rgba(26,20,16,0.15)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{
        fontSize: "0.7rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: "rgba(26,20,16,0.5)",
        fontWeight: 500,
      }}>
        {label}{required && <span style={{ color: "#C8651A", marginLeft: "2px" }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          border: "none",
          borderBottom: `1.5px solid ${borderColor}`,
          background: "transparent",
          padding: "0.7rem 0",
          fontSize: "0.95rem",
          color: "#1A1410",
          outline: "none",
          transition: "border-color 0.3s cubic-bezier(0.76,0,0.24,1)",
          width: "100%",
        }}
      />
    </div>
  );
}

function SelectField({
  label, name, value, onChange, options, required = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{
        fontSize: "0.7rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: "rgba(26,20,16,0.5)", fontWeight: 500,
      }}>
        {label}{required && <span style={{ color: "#C8651A", marginLeft: "2px" }}>*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          border: "none",
          borderBottom: `1.5px solid ${focused ? "#C8651A" : "rgba(26,20,16,0.15)"}`,
          background: "transparent",
          padding: "0.7rem 0",
          fontSize: "0.95rem",
          color: value ? "#1A1410" : "rgba(26,20,16,0.35)",
          outline: "none",
          cursor: "pointer",
          width: "100%",
          transition: "border-color 0.3s cubic-bezier(0.76,0,0.24,1)",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        <option value="" disabled>Select a service area</option>
        {options.map(opt => (
          <option key={opt} value={opt} style={{ color: "#1A1410" }}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label, name, value, onChange, required = false, placeholder = "", rows = 5,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean; placeholder?: string; rows?: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{
        fontSize: "0.7rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: "rgba(26,20,16,0.5)", fontWeight: 500,
      }}>
        {label}{required && <span style={{ color: "#C8651A", marginLeft: "2px" }}>*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        style={{
          border: "none",
          borderBottom: `1.5px solid ${focused ? "#C8651A" : "rgba(26,20,16,0.15)"}`,
          background: "transparent",
          padding: "0.7rem 0",
          fontSize: "0.95rem",
          color: "#1A1410",
          outline: "none",
          resize: "none",
          width: "100%",
          fontFamily: "inherit",
          transition: "border-color 0.3s cubic-bezier(0.76,0,0.24,1)",
        }}
      />
    </div>
  );
}

// ── Contact form ─────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    name:    "",
    email:   "",
    phone:   "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // ── TODO: Wire up Resend when API key is available ──
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // if (res.ok) setStatus("success");
    // else setStatus("error");

    // Temporary: simulate success after 1.5s
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          minHeight: "400px", padding: "2rem 0",
        }}
      >
        <div style={{ width: "48px", height: "2px", background: "#C8651A", marginBottom: "2rem" }} />
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.1, marginBottom: "1rem" }}>
          Thank you,<br />{form.name.split(" ")[0]}.
        </p>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(26,20,16,0.6)", maxWidth: "420px", marginBottom: "2rem" }}>
          We've received your message and will be in touch within one business day. We look forward to the conversation.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C8651A", fontWeight: 500, padding: 0,
            borderBottom: "1.5px solid #C8651A", paddingBottom: "0.2rem",
          }}
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <Field
          label="Full Name" name="name" value={form.name}
          onChange={handleChange} required
          placeholder="Your full name"
        />
        <Field
          label="Email Address" type="email" name="email" value={form.email}
          onChange={handleChange} required
          placeholder="your@email.com"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <Field
          label="Phone Number" type="tel" name="phone" value={form.phone}
          onChange={handleChange}
          placeholder="+233 ..."
        />
        <SelectField
          label="Service of Interest" name="service" value={form.service}
          onChange={handleChange} options={SERVICES} required
        />
      </div>

      <TextAreaField
        label="Your Message" name="message" value={form.message}
        onChange={handleChange} required rows={6}
        placeholder="Tell us about your organisation and what you're looking to achieve..."
      />

      <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        <motion.button
          type="submit"
          disabled={status === "sending"}
          style={{
            background: "#1A1410", color: "#F5EDD8",
            border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
            padding: "1rem 2.8rem",
            fontSize: "0.75rem", letterSpacing: "0.2em",
            textTransform: "uppercase", fontWeight: 500,
            opacity: status === "sending" ? 0.6 : 1,
            transition: "background 0.4s cubic-bezier(0.76,0,0.24,1)",
          }}
          whileHover={status !== "sending" ? { background: "#C8651A" } : {}}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </motion.button>

        <p style={{ fontSize: "0.75rem", color: "rgba(26,20,16,0.35)", lineHeight: 1.5 }}>
          We respond within one business day.
        </p>
      </div>

      {status === "error" && (
        <p style={{ fontSize: "0.85rem", color: "#A83E10" }}>
          Something went wrong. Please try again or email us directly at ask@ihrgh.com
        </p>
      )}
    </form>
  );
}

export default function ContactPage() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bannerY       = useTransform(scrollY, [0, 500], [0, 150]);
  const bannerOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div>

      {/* ── HERO BANNER ──────────────────────────────── */}
      <div ref={bannerRef} style={{ position: "relative", height: "55vh", minHeight: "340px", overflow: "hidden" }}>
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
            Let's Talk
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.0, letterSpacing: "-0.01em" }}
          >
            Start a Conversation.<br />
            <em style={{ color: "#C8651A" }}>We're Listening.</em>
          </motion.h1>
        </motion.div>
      </div>

      {/* ── MAIN CONTACT SECTION ─────────────────────── */}
      <section style={{ background: "#FDFAF5", padding: "7rem 4rem", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "7rem", alignItems: "start" }}>

            {/* Left — contact details */}
            <div>
              <Reveal direction="left">
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Get In Touch
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 700, color: "#1A1410", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  We'd love to hear from you.
                </h2>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "rgba(26,20,16,0.6)", marginBottom: "3rem" }}>
                  Whether you have a specific challenge in mind or simply want to explore what's possible, we're ready to listen. Every great engagement begins with an honest conversation.
                </p>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {CONTACT_DETAILS.map((c) => (
                    <div key={c.label} style={{ borderTop: "1px solid rgba(26,20,16,0.08)", paddingTop: "1.2rem" }}>
                      <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "0.4rem", fontWeight: 500 }}>
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          style={{ fontSize: "0.95rem", color: "#1A1410", textDecoration: "none", lineHeight: 1.6, transition: "color 0.3s ease" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8651A"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1A1410"; }}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: "0.95rem", color: "#1A1410", lineHeight: 1.6 }}>{c.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Social */}
              <Reveal direction="left" delay={0.2}>
                <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(26,20,16,0.08)" }}>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,20,16,0.4)", marginBottom: "1rem", fontWeight: 500 }}>
                    Follow Us
                  </p>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    {[
                      { label: "Facebook", href: "#" },
                      { label: "Twitter",  href: "#" },
                      { label: "LinkedIn", href: "#" },
                    ].map(s => (
                      <a
                        key={s.label}
                        href={s.href}
                        style={{ fontSize: "0.8rem", color: "rgba(26,20,16,0.45)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.3s ease" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8651A"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(26,20,16,0.45)"; }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal direction="right">
              <div style={{
                background: "#fff",
                padding: "3rem",
                boxShadow: "0 2px 40px rgba(26,20,16,0.06)",
              }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 600, color: "#1A1410", marginBottom: "0.3rem" }}>
                  Send us a message
                </p>
                <p style={{ fontSize: "0.82rem", color: "rgba(26,20,16,0.45)", marginBottom: "2.5rem", lineHeight: 1.6 }}>
                  Fill in the form below and we'll be in touch within one business day.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MAP / LOCATION BAND ──────────────────────── */}
      <section style={{ background: "#1A1410", padding: "5rem 4rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#C8651A", marginBottom: "0.8rem", fontWeight: 500 }}>
                  Find Us
                </p>
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#F5EDD8", lineHeight: 1.05, marginBottom: "1.2rem" }}>
                  We're based in Osu, Accra.
                </h2>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "rgba(245,237,216,0.55)", marginBottom: "2rem" }}>
                  Hse #359/1, Nii Nortey Omaboe St<br />
                  Osu, Accra, Ghana
                </p>
                <motion.a
                  href="https://maps.google.com/?q=Osu,Accra,Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block", color: "#C8651A",
                    fontSize: "0.75rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", textDecoration: "none",
                    fontWeight: 500, borderBottom: "1.5px solid #C8651A",
                    paddingBottom: "0.2rem",
                  }}
                  whileHover={{ letterSpacing: "0.3em" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  Get Directions →
                </motion.a>
              </div>

              {/* Map placeholder */}
              <div style={{ height: "280px", overflow: "hidden" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1985.535865055404!2d-0.184346!3d5.556386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf91d0fcc9f7af%3A0x7b56d50e2c75820b!2sIHR%20Limited%20Company!5e0!3m2!1sen!2sgh!4v1777731237641!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
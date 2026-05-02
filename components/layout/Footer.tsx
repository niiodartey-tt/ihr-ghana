import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background:   "#1A3330",
        position:     "relative",
        overflow:     "clip",
      }}
    >
      {/* Amber accent line */}
      <div style={{
        height:     "1px",
        background: "linear-gradient(to right, transparent, #C8651A 30%, #C8651A 70%, transparent)",
      }} />

      {/* Adinkra watermark */}
      <div style={{
        position:      "absolute",
        right:         "-4%",
        bottom:        "-5%",
        width:         "38%",
        pointerEvents: "none",
        userSelect:    "none",
        opacity:       0.06,
      }}>
        <img
          src="/symbols/adinkrahene.png"
          alt=""
          aria-hidden="true"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Main content */}
      <div style={{
        maxWidth: "1100px",
        margin:   "0 auto",
        padding:  "5rem 2rem 3rem",
        position: "relative",
      }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap:                 "5rem",
          marginBottom:        "4rem",
          alignItems:          "start",
        }}>

          {/* ── Brand column ── */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
              <img
                src="/images/ihr-logo.png"
                alt="IHR Ghana"
                style={{ height: "80px", width: "auto", objectFit: "contain" }}
              />
            </Link>
            <p style={{
              fontFamily:   "var(--font-cormorant)",
              fontStyle:    "italic",
              fontSize:     "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight:   1.7,
              color:        "rgba(245,237,216,0.55)",
              maxWidth:     "320px",
              marginBottom: "1.5rem",
            }}>
              Bespoke Business & HR Advisory solutions — rooted in African culture, built for results.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: "Facebook", href: CONTACT.social.facebook || "#" },
                { label: "Twitter",  href: CONTACT.social.twitter  || "#" },
                { label: "LinkedIn", href: "#" },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize:      "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:         "rgba(245,237,216,0.35)",
                    textDecoration:"none",
                    transition:    "color 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8651A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.35)"; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <p style={{
              fontSize:      "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "#C8651A",
              marginBottom:  "1.4rem",
              fontWeight:    500,
            }}>
              Navigation
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {NAV_LINKS.map(link => (
                <li key={link.href} style={{ listStyle: "none" }}>
                  <a
                    href={link.href}
                    style={{
                      fontSize:      "0.9rem",
                      color:         "rgba(245,237,216,0.5)",
                      textDecoration:"none",
                      transition:    "color 0.4s cubic-bezier(0.76,0,0.24,1)",
                      display:       "inline-block",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#F5EDD8"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.5)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <p style={{
              fontSize:      "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "#C8651A",
              marginBottom:  "1.4rem",
              fontWeight:    500,
            }}>
              Contact
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <li style={{ listStyle: "none" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,237,216,0.3)", marginBottom: "0.2rem" }}>Email</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{
                    fontSize:      "0.9rem",
                    color:         "rgba(245,237,216,0.55)",
                    textDecoration:"none",
                    transition:    "color 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8651A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.55)"; }}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,237,216,0.3)", marginBottom: "0.2rem" }}>Phone</p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  style={{
                    fontSize:      "0.9rem",
                    color:         "rgba(245,237,216,0.55)",
                    textDecoration:"none",
                    transition:    "color 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8651A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.55)"; }}
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,237,216,0.3)", marginBottom: "0.2rem" }}>Address</p>
                <a
                  href="https://maps.google.com/?q=Osu,Accra,Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize:      "0.9rem",
                    color:         "rgba(245,237,216,0.55)",
                    textDecoration:"none",
                    lineHeight:    1.65,
                    display:       "block",
                    transition:    "color 0.4s cubic-bezier(0.76,0,0.24,1)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8651A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.55)"; }}
                >
                  {CONTACT.address}
                </a>
              </li>
              <li style={{ listStyle: "none" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,237,216,0.3)", marginBottom: "0.2rem" }}>Hours</p>
                <p style={{ fontSize: "0.9rem", color: "rgba(245,237,216,0.55)", lineHeight: 1.6 }}>
                  {CONTACT.hours}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          paddingTop:      "2rem",
          borderTop:       "1px solid rgba(245,237,216,0.07)",
          display:         "flex",
          justifyContent:  "space-between",
          alignItems:      "center",
          flexWrap:        "wrap",
          gap:             "1rem",
        }}>
          <p style={{
            fontSize:      "0.72rem",
            color:         "rgba(245,237,216,0.22)",
            letterSpacing: "0.05em",
          }}>
            © {year} Integrated HR Ghana. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use",   href: "/terms" },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize:      "0.72rem",
                  color:         "rgba(245,237,216,0.22)",
                  textDecoration:"none",
                  transition:    "color 0.3s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.55)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.22)"; }}
              >
                {link.label}
              </a>
            ))}

            {/* Scroll to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background:    "none",
                border:        "1px solid rgba(245,237,216,0.15)",
                cursor:        "pointer",
                width:         "32px",
                height:        "32px",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                color:         "rgba(245,237,216,0.35)",
                fontSize:      "0.9rem",
                transition:    "all 0.3s cubic-bezier(0.76,0,0.24,1)",
                borderRadius:  "0",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "#C8651A";
                el.style.color = "#C8651A";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(245,237,216,0.15)";
                el.style.color = "rgba(245,237,216,0.35)";
              }}
              aria-label="Scroll to top"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
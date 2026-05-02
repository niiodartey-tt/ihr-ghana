import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#1A1410" }}>
      {/* Amber accent line */}
      <div style={{
        height:     "1px",
        background: "linear-gradient(to right, transparent, #C8651A, transparent)",
      }} />

      <div style={{
        maxWidth: "1100px",
        margin:   "0 auto",
        padding:  "5rem 2rem 3rem",
      }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap:                 "4rem",
          marginBottom:        "4rem",
        }}>

          {/* Brand */}
          <div>
            <Link href="/">
              <img
                src="/images/ihr-logo.png"
                alt="IHR Ghana"
                style={{ height: "80px", width: "auto", objectFit: "contain", marginBottom: "1.2rem" }}
              />
            </Link>
            <p style={{
              fontSize:   "0.88rem",
              lineHeight: 1.8,
              color:      "rgba(245,237,216,0.5)",
              maxWidth:   "320px",
              fontWeight: 300,
            }}>
              Bespoke Business & HR Advisory solutions rooted in African culture, built for results. Accra, Ghana.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontSize:      "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "#C8651A",
              marginBottom:  "1.2rem",
              fontWeight:    500,
            }}>
              Navigation
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize:   "0.88rem",
                      color:      "rgba(245,237,216,0.5)",
                      textDecoration: "none",
                      transition: "color 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#F5EDD8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,237,216,0.5)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontSize:      "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "#C8651A",
              marginBottom:  "1.2rem",
              fontWeight:    500,
            }}>
              Contact
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  style={{ fontSize: "0.88rem", color: "rgba(245,237,216,0.5)", textDecoration: "none" }}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  style={{ fontSize: "0.88rem", color: "rgba(245,237,216,0.5)", textDecoration: "none" }}
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li style={{ fontSize: "0.88rem", color: "rgba(245,237,216,0.5)", lineHeight: 1.6 }}>
                {CONTACT.address}
              </li>
              <li style={{ fontSize: "0.88rem", color: "rgba(245,237,216,0.5)" }}>
                {CONTACT.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop:    "2rem",
          borderTop:     "1px solid rgba(245,237,216,0.08)",
          display:       "flex",
          justifyContent:"space-between",
          alignItems:    "center",
          flexWrap:      "wrap",
          gap:           "1rem",
        }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(245,237,216,0.25)", letterSpacing: "0.05em" }}>
            © {year} Integrated HR Ghana. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["/privacy", "/terms"].map((href, i) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: "0.75rem", color: "rgba(245,237,216,0.25)", textDecoration: "none" }}
              >
                {i === 0 ? "Privacy Policy" : "Terms of Use"}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
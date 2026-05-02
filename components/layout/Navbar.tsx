"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SkypeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.72-3.403-2.286-3.403-3.751 0-3.048 2.88-4.191 5.578-4.191 2.502 0 5.423 1.379 5.423 3.214 0 .785-.687 1.24-1.44 1.24-1.52 0-1.269-2.01-4.238-2.01-1.469 0-2.274.665-2.274 1.619 0 .958.982 1.251 1.833 1.46l2.661.623c2.904.688 3.893 2.271 3.893 3.854-.001 2.55-1.985 4.36-5.653 4.36zm11.084-4.916c.209 1.974-.199 3.32-1.075 4.31L22 18.2l.007.063c.334 3.06-2.316 5.737-5.395 5.737a6.318 6.318 0 01-3.854-1.308 8.002 8.002 0 01-1.791.199c-4.819.016-8.765-3.921-8.765-8.765 0-.636.069-1.254.199-1.851A6.225 6.225 0 011.093 8.4C.766 5.34 3.44 2.666 6.52 2.666c1.274 0 2.405.441 3.347 1.143A8.412 8.412 0 0112 3.615c4.819-.016 8.765 3.921 8.765 8.765 0 .529-.05 1.049-.138 1.555.225.661.353 1.362.426 2.023z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label:      "Twitter",
    href:       CONTACT.social.twitter || "#",
    icon:       <TwitterIcon />,
    hoverColor: "#000000",
  },
  {
    label:      "Facebook",
    href:       CONTACT.social.facebook || "#",
    icon:       <FacebookIcon />,
    hoverColor: "#1877F2",
  },
  {
    label:      "Skype",
    href:       "skype:ihrghana?call",
    icon:       <SkypeIcon />,
    hoverColor: "#00AFF0",
  },
  {
    label:      "WhatsApp",
    href:       `https://wa.me/${CONTACT.phone.replace(/\D/g, "")}`,
    icon:       <WhatsAppIcon />,
    hoverColor: "#25D366",
  },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink]     = useState<string | null>(null);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full px-8 py-10">

      {/* Logo — top */}
      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="block"
      >
        <img
          src="/images/ihr-logo.png"
          alt="IHR Ghana"
          className="w-full object-contain"
          style={{ maxHeight: "120px" }}
        />
      </Link>

      {/* Spacer — pushes nav to bottom */}
      <div className="flex-1" />

      {/* Nav Links — bottom aligned */}
      <nav className="mb-10">
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-2.5 transition-all duration-500 ease-in-out",
                  pathname === link.href ? "pl-1" : "hover:pl-1"
                )}
                style={{
                  fontFamily:    "var(--font-cormorant)",
                  fontSize:      "clamp(1.3rem, 1.62vw, 1.62rem)",
                  fontWeight:    400,
                  fontStyle:     "normal",
                  letterSpacing: "-0.01em",
                  color:         pathname === link.href
                    ? "#A83E10"
                    : "rgba(0,0,0,0.89)",
                  transition:    "color 0.6s cubic-bezier(0.76, 0, 0.24, 1), padding-left 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
              >
                {link.label}
              </Link>

              {/* Animated amber underline — GPU accelerated */}
              <div
                style={{
                  height:          "2px",
                  background:      "#A83E10",
                  width:           "72px",
                  marginBottom:    "0.4rem",
                  transformOrigin: "left center",
                  transform:       hoveredLink === link.href || pathname === link.href
                    ? "scaleX(1)"
                    : "scaleX(0.4)",
                  opacity:         hoveredLink === link.href || pathname === link.href
                    ? 1
                    : 0.2,
                  transition:      [
                    "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                    "opacity 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
                  ].join(", "),
                  willChange:      "transform, opacity",
                }}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Icons — very bottom */}
      <div
        className="pt-6"
        style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
      >
        <p
          className="text-[0.62rem] tracking-[0.25em] uppercase mb-4 font-medium"
          style={{ color: "rgba(0,0,0,0.89)" }}
        >
          Follow Us
        </p>
        <div className="flex items-center justify-between">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onMouseEnter={() => setHoveredSocial(social.label)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                color:      hoveredSocial === social.label
                  ? social.hoverColor
                  : "rgba(0,0,0,0.89)",
                transition: "color 0.4s ease",
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[300px] z-40"
        style={{
          background:  "#F5EDD8",
          borderRight: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 flex flex-col gap-1.5 p-2 rounded shadow-sm"
        style={{ background: "#F5EDD8" }}
        aria-label="Toggle menu"
      >
        <span className={cn(
          "block w-5 h-px bg-dark transition-all duration-300",
          mobileOpen && "rotate-45 translate-y-2"
        )} />
        <span className={cn(
          "block w-5 h-px bg-dark transition-all duration-300",
          mobileOpen && "opacity-0"
        )} />
        <span className={cn(
          "block w-5 h-px bg-dark transition-all duration-300",
          mobileOpen && "-rotate-45 -translate-y-2"
        )} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-[300px] z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "#F5EDD8" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
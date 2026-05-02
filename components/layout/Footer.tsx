import Link from "next/link";
import { NAV_LINKS, CONTACT } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-cream/8">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-cream tracking-wide">
                IHR<span className="text-gold">.</span>Ghana
              </span>
            </Link>
            <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
              Bespoke Business & HR Advisory solutions. Rooted in African
              culture, built for results.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-[0.65rem] text-gold tracking-widest mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/50 hover:text-cream text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-[0.65rem] text-gold tracking-widest mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-3 text-sm text-cream/50">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-cream transition-colors duration-200"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="hover:text-cream transition-colors duration-200"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="leading-relaxed">{CONTACT.address}</li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs tracking-wide">
            © {year} Integrated HR Ghana. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-cream/30 hover:text-cream/60 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-cream/30 hover:text-cream/60 text-xs transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
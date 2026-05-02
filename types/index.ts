// ── Adinkra Symbols ──────────────────────────────────────
export interface AdinkraSymbol {
  name: string;
  meaning: string;
  desc: string;
  imgType: "b64" | "svg";
  src?: string;          // base64 data URI for imgType === 'b64'
  svgDraw?: string;      // svg draw key for imgType === 'svg'
  colors: [string, string, string, string, ...string[]];
}

// ── Navigation ───────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ── Services ─────────────────────────────────────────────
export interface Service {
  id: string;
  number: string;
  name: string;
  description: string;
  symbol?: string;       // Adinkra symbol SVG draw key
}

// ── Team ─────────────────────────────────────────────────
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;        // path to image in /public/images/team/
}

// ── Testimonial ──────────────────────────────────────────
export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  logo?: string;
}

// ── Client ───────────────────────────────────────────────
export interface Client {
  name: string;
  logo: string;          // path to image in /public/images/clients/
  website?: string;
}

// ── Blog ─────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  publishedAt: string;
  category: string;
  body?: unknown;        // Sanity Portable Text
  readingTime?: number;
}

// ── Job Listing ──────────────────────────────────────────
export interface JobListing {
  _id: string;
  title: string;
  slug: string;
  type: "full-time" | "contract" | "part-time";
  location: string;
  description: string;
  applyLink?: string;
  active: boolean;
  postedAt: string;
}

// ── Contact Form ─────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
import type { NavLink, Service, AdinkraSymbol } from "@/types";

// ── Navigation ───────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Our Story",   href: "/about"     },
  { label: "What We Do",  href: "/services"  },
  { label: "Our Edge",    href: "/why-us"    },
  { label: "Who We Serve", href: "/clientele" },
  { label: "Insights",    href: "/blog"      },
  { label: "Join Us",     href: "/jobs"      },
  { label: "Let's Talk",  href: "/contact"   },
];

// ── Contact ──────────────────────────────────────────────
export const CONTACT = {
  email:   "ask@ihrgh.com",
  phone:   "+233 570 002 616",
  address: "Hse #359/1, Nii Nortey Omaboe St, Osu, Accra, Ghana",
  hours:   "Monday – Friday: 8:00 – 17:00",
  social: {
    linkedin: "",
    twitter:  "",
    facebook: "",
  },
};

// ── Services ─────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id:          "hr-strategy",
    number:      "01",
    name:        "HR Strategy & Planning",
    description:
      "Comprehensive human resource strategies aligned with your organisation's mission, culture, and long-term goals.",
    symbol:      "nyansapo",
  },
  {
    id:          "talent-acquisition",
    number:      "02",
    name:        "Talent Acquisition",
    description:
      "Identifying and attracting the right people — building teams that don't just perform, but belong.",
    symbol:      "sankofa",
  },
  {
    id:          "leadership-development",
    number:      "03",
    name:        "Leadership Development",
    description:
      "Coaching and developing leaders who inspire trust, drive transformation, and carry your culture forward.",
    symbol:      "adinkrahene",
  },
  {
    id:          "performance-management",
    number:      "04",
    name:        "Performance Management",
    description:
      "Systems that bring out the best in your team — measuring what matters, improving what counts.",
    symbol:      "akoma",
  },
  {
    id:          "change-management",
    number:      "05",
    name:        "Change Management",
    description:
      "Guiding organisations through transition with clarity, empathy, and a human-centred approach.",
    symbol:      "gye-nyame",
  },
  {
    id:          "business-advisory",
    number:      "06",
    name:        "Business Advisory",
    description:
      "Strategic counsel at the intersection of people and business — because great organisations begin with great decisions.",
    symbol:      "nyansapo",
  },
];

// ── Stats ────────────────────────────────────────────────
export const STATS = [
  { value: "15+", label: "Years of Experience"  },
  { value: "200+", label: "Clients Served"      },
  { value: "98%", label: "Client Satisfaction"  },
  { value: "12",  label: "Industries Covered"   },
];

// ── Adinkra Symbols ──────────────────────────────────────
// src fields will be populated in Step 9
// once you have dropped the images into /public/symbols/
export const ADINKRA_SYMBOLS: AdinkraSymbol[] = [
  {
    name:    "Gye Nyame",
    meaning: "Except God — Omnipotence of the Supreme",
    imgType: "b64",
    src:     "",           // populated after images are added
    desc:    "Before the first star was pinned to the sky — before time carved its first line into the face of eternity — there was only this. The symbol that carries no beginning and no end, a declaration so absolute it required no author and no signature. To hold it is not a statement of faith. It is an acknowledgement that faith itself belongs to something far greater than the one who believes.",
    colors:  ["#C8651A", "#A83E10", "#3A7D6E", "#2D6459", "#C8651A", "#A83E10", "#3A7D6E", "#2D6459"],
  },
  {
    name:    "Akoma",
    meaning: "Heart — Patience, Love & Goodwill",
    imgType: "b64",
    src:     "",
    desc:    "The heart that endures without breaking is the most formidable force in any room, in any era, in any reckoning. Patience here is not timidity held with trembling hands — it is accumulated strength, deliberately withheld until the moment it is needed most. To bring an open heart into a fractured world and choose to keep it open — that is the quietest, fiercest act of defiance there is.",
    colors:  ["#3A7D6E", "#2D6459", "#C8651A", "#A83E10", "#3A7D6E", "#2D6459", "#C8651A", "#A83E10"],
  },
  {
    name:    "Sankofa",
    meaning: "Return & Fetch It — Wisdom from the Past",
    imgType: "b64",
    src:     "",
    desc:    "A bird that flies forward while its head turns back — not in loss, not in longing, but in the deliberate gathering of what must never be left behind. The past is not a wound to be buried; it is a map, drawn in the lives of those who came before you. To build a future without it is to raise a tower on sand and call it a fortress.",
    colors:  ["#A83E10", "#C8651A", "#2D6459", "#3A7D6E", "#A83E10", "#C8651A", "#2D6459", "#3A7D6E"],
  },
  {
    name:    "Adinkrahene",
    meaning: "King of Adinkra — Leadership & Authority",
    imgType: "svg",
    svgDraw: "adinkrahene",
    desc:    "Three perfect circles — one within the other, no beginning, no end, no edge where authority surrenders itself. It is said that this single symbol inspired the design of all the others; the first mark from which an entire visual language was born. Leadership in the Akan tradition is not a title seized or inherited. It is a gravity — patient, inevitable — that draws all things into alignment around it.",
    colors:  ["#C8651A", "#3A7D6E", "#A83E10", "#2D6459", "#C8651A", "#3A7D6E", "#A83E10", "#2D6459"],
  },
  {
    name:    "Nyansapo",
    meaning: "Wisdom Knot — Intelligence & Ingenuity",
    imgType: "svg",
    svgDraw: "nyansapo",
    desc:    "A knot that only the wise can untie — not because of its complexity alone, but because wisdom knows when to pull and when to yield, when to tighten and when to release. Intelligence without patience is simply impatience wearing a finer coat. The one who carries this symbol holds the rarest combination: a mind that thinks clearly, a heart that waits deliberately, and hands that always know the difference.",
    colors:  ["#2D6459", "#3A7D6E", "#A83E10", "#C8651A", "#2D6459", "#3A7D6E", "#A83E10", "#C8651A"],
  },
];
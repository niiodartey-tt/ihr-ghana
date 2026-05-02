import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: {
    template: "%s | IHR Ghana",
    default:  "IHR Ghana — Bespoke Business & HR Advisory Services",
  },
  description:
    "Integrated HR Ghana (IHR) delivers bespoke Business and Human Resource Advisory solutions. Rooted in African culture, built for results. Based in Accra, Ghana.",
  keywords: [
    "HR Advisory Ghana",
    "Human Resources Ghana",
    "Business Advisory Accra",
    "People Management Ghana",
    "HR Consulting West Africa",
    "Recruitment Ghana",
    "Leadership Development Ghana",
    "Organisational Design Ghana",
  ],
  metadataBase: new URL("https://ihrgh.com"),
  openGraph: {
    title:       "IHR Ghana — Bespoke Business & HR Advisory",
    description: "Integrated and candid People Management and Business Advisory solutions. Rooted in African culture, built for results.",
    url:         "https://ihrgh.com",
    siteName:    "IHR Ghana",
    locale:      "en_GH",
    type:        "website",
    images: [
      {
        url:    "/images/ihr-logo.png",
        width:  800,
        height: 800,
        alt:    "IHR Ghana",
      },
    ],
  },
  twitter: {
    card:        "summary",
    title:       "IHR Ghana — Bespoke Business & HR Advisory",
    description: "Integrated and candid People Management and Business Advisory solutions.",
    images:      ["/images/ihr-logo.png"],
  },
  icons: {
    icon:             "/favicon.ico",
    apple:            "/apple-touch-icon.png",
    shortcut:         "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-cream text-dark font-body antialiased">
        <SmoothScroll>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-[300px]">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
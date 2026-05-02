import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: {
    template: "%s | IHR Ghana — Bespoke HR Advisory",
    default: "IHR Ghana — Bespoke Business & HR Advisory Services",
  },
  description:
    "Integrated and candid People Management and Business Advisory solutions. Rooted in African culture, built for results.",
  keywords: [
    "HR Advisory Ghana",
    "Human Resources Ghana",
    "Business Advisory Accra",
    "People Management Ghana",
    "HR Consulting West Africa",
  ],
  metadataBase: new URL("https://ihrgh.com"),
  openGraph: {
    title: "IHR Ghana — Bespoke Business & HR Advisory",
    description:
      "Integrated and candid People Management and Business Advisory solutions.",
    url: "https://ihrgh.com",
    siteName: "IHR Ghana",
    locale: "en_GH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" style={{ scrollBehavior: "smooth" }}>
      <body className="bg-cream text-dark font-body antialiased">
        <SmoothScroll>
        <div className="flex">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main content — offset by sidebar width */}
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
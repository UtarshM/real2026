import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import Navbar from "@/components/Navbar";
import PriceDropAlertBanner from "@/components/PriceDropAlertBanner";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import AiSearchModal from "@/components/AiSearchModal";
import { siteConfig } from "@/config/siteConfig";
import { getOrganizationSchema } from "@/lib/seo";

export const metadata = {
  title: `${siteConfig.name} | Premium Real Estate Specialists in Ahmedabad & Gandhinagar`,
  description: siteConfig.description,
  keywords: "Real Estate Ahmedabad, Real Estate Gandhinagar, Video Property Tour, Buy Flat, Rent PG, Commercial Office, Plots, GIFT City, GUJRERA",
  robots: "index, follow",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className="h-full antialiased scroll-smooth light-theme" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 bg-white text-slate-900" suppressHydrationWarning>
        <AuthProvider>
          <PriceDropAlertBanner />
          <Navbar />
          <CommandPalette />
          <AiSearchModal />
          <main className="flex-grow">{children}</main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

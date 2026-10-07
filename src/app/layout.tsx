import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { EventBot } from "@/components/EventBot";
import { auth } from "@/lib/auth";
import { Toaster } from "sonner";
import Script from "next/script";
import { HydrationFix } from "@/components/HydrationFix";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EventOS — Discover & Manage Events",
    template: "%s | EventOS",
  },
  description:
    "The modern event management platform for sports, college fests, and entertainment events. Discover, register, and experience amazing events near you.",
  keywords: [
    "events",
    "sports events",
    "marathon",
    "running",
    "cricket",
    "event management",
    "registration",
    "tickets",
  ],
  authors: [{ name: "EventOS" }],
  openGraph: {
    title: "EventOS — Discover & Manage Events",
    description:
      "The modern event management platform for sports, college fests, and entertainment events.",
    type: "website",
    locale: "en_IN",
    siteName: "EventOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventOS — Discover & Manage Events",
    description:
      "The modern event management platform for sports, college fests, and entertainment events.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await auth();
  } catch (error) {
    // If the browser holds a stale or invalid session cookie from a secret change, gracefully fallback to null
    session = null;
  }

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <Script
          id="suppress-extension-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, value) {
                    if (
                      name === 'bis_skin_checked' ||
                      name === 'bis_register' ||
                      (typeof name === 'string' && name.indexOf('__processed_') === 0)
                    ) {
                      return;
                    }
                    return origSetAttr.apply(this, arguments);
                  };
                } catch(e) {}
              })();
            `,
          }}
        />
        <Navbar user={session?.user ?? null} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-foreground)",
            },
          }}
        />
        <HydrationFix />
        <EventBot />
      </body>
    </html>
  );
}

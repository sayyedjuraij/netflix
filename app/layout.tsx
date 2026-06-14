import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StreamNavigator — Free AI Streaming Discovery",
    template: "%s | StreamNavigator",
  },
  description:
    "Discover free and legal streaming content with AI-powered recommendations. Find movies, series, and documentaries available in your country across free platforms like Tubi, Pluto TV, Plex, and more.",
  keywords: [
    "free streaming",
    "legal streaming",
    "AI recommendations",
    "movies",
    "tv series",
    "Tubi",
    "Pluto TV",
    "Plex",
    "watch free",
    "streaming discovery",
  ],
  authors: [{ name: "StreamNavigator" }],
  creator: "StreamNavigator",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://streamnavigator.app",
    title: "StreamNavigator — Free AI Streaming Discovery",
    description:
      "AI-powered discovery for free and legal streaming content across platforms.",
    siteName: "StreamNavigator",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamNavigator — Free AI Streaming Discovery",
    description: "AI-powered discovery for free and legal streaming content.",
    creator: "@streamnavigator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

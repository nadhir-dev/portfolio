import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { CommandMenu } from "@/components/layout/command-menu";
import { JsonLd } from "@/components/shared/json-ld";
import { ToastProvider } from "@/components/ui/toast";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const title = "Nadhir Bendraou | Full-stack Developer & AI/ML Engineer";
const description =
  "Full-stack developer and ESI SBA student building fast, scalable web, desktop, mobile, and AI products.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title,
  description,
  keywords: [
    "Nadhir Bendraou",
    "Full-stack developer",
    "AI engineer",
    "ML engineer",
    "Next.js developer",
    "ElysiaJS",
    "Bun",
    "TypeScript",
    "Algeria developer",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: `https://${site.domain}` }],
  creator: site.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: site.name,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (error) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ToastProvider>
          <CommandMenu />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

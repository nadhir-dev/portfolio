import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CommandMenu } from "@/components/layout/command-menu";
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
  authors: [{ name: site.name, url: `https://${site.domain}` }],
  creator: site.name,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <CommandMenu />
        {children}
      </body>
    </html>
  );
}

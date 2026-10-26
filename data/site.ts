export const site = {
  name: "Nadhir Bendraou",
  role: "Full-stack Developer & AI/ML Engineer",
  location: "Algeria",
  address: "Froha, Mascara, Algeria",
  phone: "0656514320",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "nadhir.code@gmail.com",
  domain: "nadhirbendraou.com",
  school: "ESI SBA",
  schoolUrl: "https://www.esi-sba.dz/",
  availability: "Open to freelance and remote work",
  timezone: "Africa/Algiers",
  responseTime: "minutes to hours",
  languages: "Arabic (native), French (2A), English (B2)",
  experienceStartYear: 2024,
  resumeUrl: "",
  newsletterUrl: "",
  bookingUrl: "https://cal.com/nadhir",
  services: [
    "Full-stack web development",
    "Web, desktop, and mobile frontends",
    "Backend APIs, databases, and DevOps",
    "ML and AI engineering",
    "Custom platforms and software",
  ],
  socials: [
    {
      name: "GitHub",
      href: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/nadhir-dev",
    },
    {
      name: "Instagram",
      href:
        process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
        "https://www.instagram.com/nadhir.dev",
    },
    {
      name: "LinkedIn",
      href:
        process.env.NEXT_PUBLIC_LINKEDIN_URL ??
        "https://www.linkedin.com/in/nadhirdev",
    },
    ...(process.env.NEXT_PUBLIC_TIKTOK_URL
      ? [{ name: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL }]
      : []),
  ],
};

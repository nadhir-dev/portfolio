import { site } from "@/data/site";
import type { Project } from "@/data/projects";

export const siteUrl = `https://${site.domain}`;

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/my-avatar.jpg`,
    email: site.email,
    telephone: site.phone,
    jobTitle: site.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Froha",
      addressRegion: "Mascara",
      addressCountry: "DZ",
    },
    affiliation: {
      "@type": "EducationalOrganization",
      name: site.school,
      url: site.schoolUrl,
    },
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: site.services,
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description:
      "Portfolio of Nadhir Bendraou, a full-stack developer and AI/ML engineer.",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
  };
}

export function projectJsonLd(project: Project): Record<string, unknown> {
  const urls = [project.links.live, project.links.code].filter(
    (url): url is string => Boolean(url),
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: `${siteUrl}${project.image}`,
    url: `${siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    creator: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    keywords: project.stack.join(", "),
    genre: "Web development",
    codeRepository: project.links.code,
    sameAs: urls,
  };
}

export function projectBreadcrumbJsonLd(
  project: Project,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: `${siteUrl}/projects/${project.slug}`,
      },
    ],
  };
}

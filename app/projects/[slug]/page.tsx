import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, Github, Globe } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { JsonLd } from "@/components/shared/json-ld";
import { ProjectCaseStudy } from "@/components/sections/projects/case-study";
import { ProjectContent } from "@/components/sections/projects/content";
import { ProjectToc } from "@/components/sections/projects/toc";
import { ProjectTeam } from "@/components/sections/projects/team";
import { projects } from "@/data/projects";
import icons from "@/data/tech-icons";
import { site } from "@/data/site";
import {
  projectBreadcrumbJsonLd,
  projectJsonLd,
  siteUrl,
} from "@/lib/seo";

const TECH_KEYS: Record<string, string> = {
  FastAPI: "fastapi",
  Python: "python",
  PostgreSQL: "postgresql",
  SQLAlchemy: "sqlalchemy",
  Redis: "redis",
  Docker: "docker",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  React: "react",
  Bun: "bun",
  Elysia: "elysiajs",
  MongoDB: "mongodb",
  "Tailwind CSS": "tailwindcss",
};

const techIcons = new Map(
  icons.map(({ name, component }) => [name, component] as const),
);

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  const title = `${project.title} | ${site.name}`;
  const description = project.summary;

  return {
    title,
    description,
    keywords: [project.title, project.role, ...project.stack, site.name],
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    category: "technology",
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `/projects/${project.slug}`,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: project.image,
          alt: `${project.title} project preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const tocItems = [
    { id: "overview", label: "Overview" },
    ...(project.sections?.map((section) => ({
      id: section.id,
      label: section.label,
    })) ?? []),
    ...(project.caseStudy
      ? [{ id: "screenshots", label: "Screenshots" }]
      : []),
    { id: "features", label: "What it includes" },
  ];

  return (
    <>
      <JsonLd
        data={[projectJsonLd(project), projectBreadcrumbJsonLd(project)]}
      />
      <Navbar />

      <main
        id="main-content"
        className="relative min-h-screen bg-background pt-24 md:pt-28"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240px] bg-[linear-gradient(to_right,rgba(127,127,127,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,127,127,0.12)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]" />

        <header className="relative z-10 border-b border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Link
                href="/#projects"
                aria-label="Back to projects"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            <h1 className="font-editorial max-w-5xl text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="max-w-4xl text-base text-muted-foreground md:text-lg md:text-balance">
              {project.summary}
            </p>

          </div>
        </header>

        <div className="relative z-10 mx-auto flex max-w-7xl divide-x divide-border px-4 md:px-0">
          <div className="w-full overflow-hidden">
            <div className="relative h-[320px] w-full overflow-hidden border border-transparent md:h-[500px]">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover object-top"
              />
            </div>

            <div className="border-b border-border p-6 lg:p-10">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Technologies used
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => {
                  const iconKey = TECH_KEYS[item];
                  const Icon = iconKey ? techIcons.get(iconKey) : undefined;

                  return (
                    <span
                      key={item}
                      className="flex h-8 items-center gap-2 rounded-full border border-neutral-200/80 bg-white/90 px-2.5 text-xs font-semibold tracking-tight text-neutral-900 shadow-sm backdrop-blur-2xl dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:text-neutral-50"
                    >
                      {Icon ? (
                        <Icon
                          className={`h-4 w-4 ${iconKey === "nextjs" ? "dark:invert" : ""}`}
                          aria-hidden="true"
                        />
                      ) : (
                        <Code2 className="h-4 w-4 text-brand" aria-hidden="true" />
                      )}
                      {item}
                    </span>
                  );
                })}
              </div>
              {project.team?.length ? (
                <div className="mt-7">
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Team
                  </p>
                  <ProjectTeam members={project.team} className="mt-3 pb-2" />
                </div>
              ) : null}

              <div className={`${project.team?.length ? "mt-6" : "mt-4"} flex items-center justify-between gap-4`}>
                <p className="text-sm text-muted-foreground">
                  Released {project.releasedAt ?? project.year}
                  {project.duration ? ` · ${project.duration}` : ""}
                </p>

                <div className="flex items-center gap-3">
                  {project.links.code ? (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View code on GitHub"
                      title="View code on GitHub"
                      className="inline-flex text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  ) : null}
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View live demo"
                      title="View live demo"
                      className="inline-flex text-neutral-400 transition-colors hover:text-neutral-950 dark:text-neutral-500 dark:hover:text-white"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10">
              <div className="max-w-none space-y-12">
                <section id="overview" className="scroll-mt-24">
                  <h2 className="font-editorial text-2xl font-medium tracking-tight">
                    Overview
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.description}
                  </p>
                  {project.content?.length ? (
                    <ProjectContent blocks={project.content} />
                  ) : null}
                </section>

                {project.sections?.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="font-editorial text-2xl font-medium tracking-tight">
                      {section.title}
                    </h2>
                    <ProjectContent blocks={section.blocks} />
                  </section>
                ))}

                {project.caseStudy ? (
                  <ProjectCaseStudy caseStudy={project.caseStudy} />
                ) : null}

                <section id="features" className="scroll-mt-24">
                  <h2 className="font-editorial text-2xl font-medium tracking-tight">
                    What it includes
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>

              </div>
            </div>

          </div>

          <aside className="hidden w-[350px] shrink-0 bg-muted/40 p-6 lg:block lg:p-10 dark:bg-muted/10">
            <div className="sticky top-20 space-y-8">
              <div className="flex items-start gap-3">
                <Image
                  src="/my-avatar.jpg"
                  alt={site.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-border object-cover"
                />
                <div>
                  <h2 className="text-sm font-semibold tracking-tight">
                    {site.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">{site.role}</p>
                </div>
              </div>

              <ProjectToc items={tocItems} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { JsonLd } from "@/components/shared/json-ld";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import {
  projectBreadcrumbJsonLd,
  projectJsonLd,
  siteUrl,
} from "@/lib/seo";

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

  return (
    <>
      <JsonLd
        data={[projectJsonLd(project), projectBreadcrumbJsonLd(project)]}
      />
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen bg-white px-6 pb-24 pt-32 text-foreground transition-colors dark:bg-neutral-950 md:pt-40"
      >
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-medium tracking-wide text-brand uppercase">
                {project.year} · {project.role}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-strong"
                  >
                    <Globe className="h-4 w-4" />
                    View live site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                {project.links.code ? (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <Github className="h-4 w-4" />
                    View code
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100 dark:border-neutral-800/80 dark:bg-neutral-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <section>
              <h2 className="text-sm font-semibold tracking-wider text-brand uppercase">
                What it includes
              </h2>
              <ul className="mt-5 space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-semibold tracking-wider text-brand uppercase">
                Stack
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-sm text-neutral-700 dark:border-neutral-800/80 dark:bg-neutral-900/80 dark:text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand-strong"
            >
              Have a similar project? Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

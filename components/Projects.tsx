"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactElement } from "react";
import icons from "@/data/tech-icons";
import Image from "next/image";

const iconMap: Record<
  string,
  (props: { [key: string]: string | number }) => ReactElement
> = {};
for (const icon of icons) {
  iconMap[icon.name] = icon.component;
}

type Tech = {
  name: string;
  icon?: string;
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  tech?: Tech[];
  images?: string[];
  accent: string;
  href: string;
  code: string;
};

const PROJECTS: Project[] = [
  {
    title: "Mediora",
    description:
      "A platform where patients can find doctors, check real-time availability, and book, pay for, and chat about appointments — no phone calls or waiting rooms needed. Doctors manage their schedules and get verified from their own dashboard.",
    images: [
      "/mediora/1.jpg",
      "/mediora/2.jpg",
      "/mediora/3.jpg",
      "/mediora/4.jpg",
      "/mediora/5.jpg",
      "/mediora/6.jpg",
      "/mediora/7.jpg",
      "/mediora/8.jpg",
    ],
    tech: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "Docker", icon: "docker" },
    ],
    tags: [],
    accent: "from-sky-600 to-indigo-600",
    href: "https://mediora-back-2.onrender.com",
    code: "https://github.com/nadhir-dev/mediora-back",
  },
  {
    title: "Library Management System",
    description:
      "A complete online bookstore where customers browse, review, and favorite books, then check out — backed by a full admin dashboard for inventory, orders, authors, and bulk CSV book imports.",
    images: [
      "/library-management-project/1.webp",
      "/library-management-project/2.webp",
      "/library-management-project/3.webp",
      "/library-management-project/4.webp",
      "/library-management-project/5.webp",
      "/library-management-project/6.webp",
      "/library-management-project/7.webp",
      "/library-management-project/8.webp",
    ],
    tech: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Bun", icon: "bun" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Elysia", icon: "elysiajs" },
    ],
    tags: [],
    accent: "from-emerald-600 to-teal-600",
    href: "",
    code: "https://github.com/nadhir-dev/library-system",
  },
  {
    title: "Professional Landing Page",
    description:
      "A clean, conversion-focused landing page — modern design, fast and fully responsive, built to present a product or brand beautifully.",
    images: [
      "/professional-landing-page/screenshot-1.webp",
      "/professional-landing-page/screenshot-2.webp",
    ],
    tech: [
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "Nextjs", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
    ],
    tags: [],
    accent: "from-gray-800 to-gray-950",
    href: "https://management-system-landing-page.vercel.app/",
    code: "https://github.com/nadhir-dev/management-system-landing-page",
  },
  {
    title: "Older Portfolio",
    description:
      "An earlier version of my portfolio — my first take on presenting who I am and what I build.",
    images: ["/older-portfolio/older-portfolio.webp"],
    tech: [
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "React", icon: "react" },
    ],
    tags: [],
    accent: "from-red-600 to-orange-600",
    href: "https://older-portfolio-7cs88i5mh-nadhir-s-projects1.vercel.app/",
    code: "https://github.com/nadhir-dev/older-portfolio",
  },
];

function TechBadges({ tech }: { tech: Tech[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : undefined;
        return (
          <span
            key={item.name}
            className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
          >
            {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" /> : null}
            {item.name}
          </span>
        );
      })}
    </div>
  );
}

const IMAGE_DIMS: Record<string, { width: number; height: number }> = {
  "/mediora/1.jpg": { width: 1042, height: 1024 },
  "/mediora/2.jpg": { width: 1158, height: 641 },
  "/mediora/3.jpg": { width: 1280, height: 559 },
  "/mediora/4.jpg": { width: 988, height: 596 },
  "/mediora/5.jpg": { width: 1112, height: 734 },
  "/mediora/6.jpg": { width: 1280, height: 542 },
  "/mediora/7.jpg": { width: 1280, height: 761 },
  "/mediora/8.jpg": { width: 1024, height: 721 },
  "/library-management-project/1.webp": { width: 1920, height: 1006 },
  "/library-management-project/2.webp": { width: 1920, height: 1006 },
  "/library-management-project/3.webp": { width: 1920, height: 1006 },
  "/library-management-project/4.webp": { width: 1920, height: 998 },
  "/library-management-project/5.webp": { width: 1920, height: 998 },
  "/library-management-project/6.webp": { width: 1920, height: 998 },
  "/library-management-project/7.webp": { width: 1920, height: 998 },
  "/library-management-project/8.webp": { width: 1920, height: 998 },
  "/professional-landing-page/screenshot-1.webp": {
    width: 1500,
    height: 5142,
  },
  "/professional-landing-page/screenshot-2.webp": {
    width: 1500,
    height: 5142,
  },
  "/older-portfolio/older-portfolio.webp": { width: 3820, height: 8964 },
};

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(id);
  }, [paused, count]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => {
        const dims = IMAGE_DIMS[src] ?? { width: 1280, height: 800 };
        return (
          <div
            key={src}
            className={`absolute inset-0 overflow-y-auto transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              width={dims.width}
              height={dims.height}
              sizes="50vw"
              className="h-auto w-full"
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        );
      })}

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1.5 text-gray-900 backdrop-blur-sm transition-colors hover:bg-white"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1.5 text-gray-900 backdrop-blur-sm transition-colors hover:bg-white"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 md:flex-row">
      {/* Screenshot carousel / browser-chrome mockup */}
      <div
        className={`relative aspect-video overflow-hidden bg-linear-to-br ${project.accent} md:w-1/2`}
      >
        {project.images ? (
          <ImageCarousel images={project.images} title={project.title} />
        ) : (
          <>
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              </div>
              <p className="text-lg leading-snug text-white/90">
                {project.title}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-8">
        <h3 className="text-xl font-medium text-gray-900">{project.title}</h3>

        <p className="text-sm leading-relaxed text-gray-500">
          {project.description}
        </p>

        {project.tech ? (
          <TechBadges tech={project.tech} />
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-5">
          {project.href && (
            <a
              href={project.href}
              aria-label={`View ${project.title}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 transition-colors group-hover:text-indigo-600"
            >
              View project
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              aria-label={`View source for ${project.title}`}
              target="_blank"
              className="text-sm font-medium text-gray-400 transition-colors hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                height={18}
                width={18}
              >
                <g fill="#181616">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  />
                  <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
                </g>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-indigo-600">
          Selected work
        </p>
        <h2
          className="text-4xl font-medium text-gray-900"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          Things I&apos;ve shipped
        </h2>
      </div>

      <p className="mb-12 max-w-xl text-gray-500">
        A selection of products, dashboards, and tools I&#39;ve built recently —
        ranging from full-stack apps to smaller experiments and write-ups.
      </p>

      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

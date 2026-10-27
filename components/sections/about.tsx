"use client";

import ScrollReveal from "@/components/shared/scroll-reveal";
import { site } from "@/data/site";

const CONTENT =
  "I'm Nadhir, a full-stack developer and ESI SBA student from Algeria. Since 2024 I've built fast, scalable web, desktop, and mobile products, with a growing focus on ML and AI. I care about clean code, performance, and systems that stay simple.";

export default function About() {
  return (
    <section id="about" className="px-6 bg-white transition-colors dark:bg-neutral-950">
      <h2 className="sr-only">About {site.name}</h2>
      <ScrollReveal
        containerClassName="max-w-6xl mx-auto pt-20 pb-6"
        textClassName="text-gray-950 dark:text-white"
        size="xl"
        align="center"
        once
      >
        {CONTENT}
      </ScrollReveal>
      <div className="mx-auto max-w-6xl pb-20 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Baccalaureate 18.20/20 · Studying at{" "}
        <a
          href={site.schoolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-700 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline dark:text-neutral-300 dark:hover:text-white"
        >
          ESI SBA
        </a>{" "}
        · Content creator · Open to remote work
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    const animate = () => {
      currentPosition.current.x +=
        (targetPosition.current.x - currentPosition.current.x) * 0.16;
      currentPosition.current.y +=
        (targetPosition.current.y - currentPosition.current.y) * 0.16;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${currentPosition.current.x + 20}px, ${currentPosition.current.y - 100}px, 0)`;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    targetPosition.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-full max-w-6xl px-6 py-16"
    >
      <h2 className="mb-8 text-sm font-medium tracking-wide text-brand uppercase">
        Project Index
      </h2>

      <div
        ref={previewRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-20 hidden overflow-hidden rounded-xl shadow-2xl transition-all duration-300 md:block",
          activeIndex === null
            ? "scale-90 opacity-0"
            : "scale-100 opacity-100",
        )}
      >
        <div className="relative h-[180px] w-[280px] overflow-hidden rounded-xl bg-secondary">
          {activeProject ? (
            <Image
              key={activeProject.title}
              src={activeProject.image}
              alt={activeProject.title}
              fill
              sizes="280px"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0" onMouseLeave={() => setActiveIndex(null)}>
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={`/projects/${project.slug}`}
            className="group block cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
          >
            <div className="relative border-t border-border py-5 transition-all duration-300 ease-out">
              <div className="absolute inset-0 -mx-4 scale-95 rounded-lg bg-secondary/50 px-4 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-lg font-medium tracking-tight text-foreground">
                      <span className="relative">
                        {project.title}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 ease-out group-hover:w-full" />
                      </span>
                    </h3>

                    <ArrowUpRight className="h-4 w-4 -translate-x-2 translate-y-2 text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground transition-all duration-300 ease-out group-hover:text-foreground/70">
                    {project.summary}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground tabular-nums transition-all duration-300 ease-out group-hover:text-foreground/60">
                  {project.year}
                </span>
              </div>
            </div>
          </a>
        ))}

        <div className="border-t border-border" />
      </div>
    </section>
  );
}

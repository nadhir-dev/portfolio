"use client";

import { useState } from "react";
import icons from "@/data/tech-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TECH_NAMES: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  rust: "Rust",
  golang: "Go",
  html: "HTML",
  css: "CSS",
  react: "React",
  tailwindcss: "Tailwind CSS",
  nodejs: "Node.js",
  bun: "Bun",
  fastapi: "FastAPI",
  fiber: "Fiber",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  redis: "Redis",
  elysiajs: "ElysiaJS",
  drizzle: "Drizzle ORM",
  nextjs: "Next.js",
  sqlalchemy: "SQLAlchemy",
  mongoose: "Mongoose",
  docker: "Docker",
  kubernetes: "Kubernetes",
  git: "Git",
  terraform: "Terraform",
  aws: "AWS",
  postman: "Postman",
  vscode: "VS Code",
};

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex h-40 shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {icons.map(({ component: Logo, name }, i) => {
        const label = TECH_NAMES[name] ?? name;

        return (
          <Tooltip key={`${name}-${i}`}>
            <TooltipTrigger asChild>
              <span
                tabIndex={hidden ? -1 : 0}
                aria-label={label}
                className="mx-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-md outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <Logo
                  className={`h-10 w-10 shrink-0 ${name === "nextjs" || name === "rust" ? "dark:invert" : ""}`}
                  draggable="false"
                  aria-hidden="true"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const [paused, setPaused] = useState(false);

  const togglePaused = () => setPaused((value) => !value);

  return (
    <TooltipProvider delay={200}>
      <div
        id="skills"
        role="button"
        tabIndex={0}
        aria-pressed={paused}
        aria-label={paused ? "Resume tech marquee" : "Pause tech marquee"}
        onClick={togglePaused}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePaused();
          }
        }}
        className="relative mx-auto w-full max-w-6xl cursor-pointer select-none overflow-hidden bg-background px-6 py-10 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />

        <div
          className="marquee-inner"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          <LogoGroup />
          <LogoGroup hidden />
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent md:w-40" />
      </div>
    </TooltipProvider>
  );
}

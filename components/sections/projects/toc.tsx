"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ProjectTocItem = {
  id: string;
  label: string;
};

export function ProjectToc({
  className,
  items,
}: {
  className?: string;
  items: ProjectTocItem[];
}) {
  const [activeId, setActiveId] = useState("overview");
  const itemKey = items.map((item) => item.id).join("|");

  useEffect(() => {
    const sections = itemKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [itemKey]);

  return (
    <nav
      className={cn("border-l border-border pl-4", className)}
      aria-label="On this page"
    >
      <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm text-muted-foreground transition-colors hover:text-foreground",
                activeId === item.id && "font-medium text-brand",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

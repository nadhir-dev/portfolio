/* eslint-disable @next/next/no-img-element */
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ProjectTeamMember } from "@/data/projects";

export function ProjectTeam({
  members = [],
  className,
}: {
  members?: ProjectTeamMember[];
  className?: string;
}) {
  if (members.length === 0) return null;

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {members.map((member) => (
        <div key={member.handle} className="group relative">
          <div className="pointer-events-none absolute -top-16 right-0 z-20 w-max translate-y-1 rounded-lg border border-neutral-200/80 bg-white/95 px-3 py-2 opacity-0 shadow-lg backdrop-blur-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:border-neutral-800/80 dark:bg-neutral-950/95">
            <div className="flex items-center gap-1">
              <p className="text-xs font-medium text-neutral-950 dark:text-neutral-50">
                {member.name}
              </p>
              {member.verified ? (
                <BadgeCheck className="h-3 w-3 text-brand" />
              ) : null}
            </div>
            <span className="text-[11px] text-muted-foreground">
              @{member.handle}
            </span>
            {member.role ? (
              <span className="block text-[11px] text-muted-foreground">
                {member.role}
              </span>
            ) : null}
            <span className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-r border-b border-neutral-200/80 bg-white/95 dark:border-neutral-800/80 dark:bg-neutral-950/95" />
          </div>

          <img
            src={member.image}
            alt={member.name}
            className="relative h-12 w-12 rounded-full border-2 border-white object-cover transition-transform duration-300 group-hover:-translate-x-2 dark:border-neutral-950"
          />
        </div>
      ))}
    </div>
  );
}

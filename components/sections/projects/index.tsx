import { projects } from "@/data/projects";

import { ProjectShowcase } from "./showcase";

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full bg-white text-foreground transition-colors dark:bg-neutral-950"
    >
      <ProjectShowcase projects={projects} />
    </section>
  );
}

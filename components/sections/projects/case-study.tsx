import Image from "next/image";
import type { ProjectCaseStudy } from "@/data/projects";

export function ProjectCaseStudy({
  caseStudy,
}: {
  caseStudy: ProjectCaseStudy;
}) {
  return (
    <>
      <section id="screenshots" className="scroll-mt-24">
        <h2 className="font-editorial text-2xl font-medium tracking-tight">Screenshots</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {caseStudy.screenshots.map((screenshot, index) => (
            <figure key={`${screenshot.alt}-${index}`} className="space-y-2">
              {screenshot.src ? (
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 text-sm text-muted-foreground">
                  Screenshot placeholder
                </div>
              )}
              <figcaption className="text-xs text-muted-foreground">
                {screenshot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

import Image from "next/image";

import type { ProjectContentBlock } from "@/data/projects";
import { ProjectCodeBlock } from "./code-block";

export function ProjectContent({ blocks }: { blocks: ProjectContentBlock[] }) {
  return (
    <div className="mt-8 space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={index}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h3
              key={index}
              className="pt-2 text-xl font-semibold tracking-tight md:text-2xl"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "code") {
          return (
            <ProjectCodeBlock
              key={index}
              code={block.code}
              language={block.language}
              filename={block.filename}
            />
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";

          return (
            <List
              key={index}
              className={`space-y-2 pl-5 text-base leading-relaxed text-muted-foreground ${block.ordered ? "list-decimal" : "list-disc"}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{item}</li>
              ))}
            </List>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-2 border-brand pl-4 text-base italic leading-relaxed text-muted-foreground"
            >
              <p>{block.text}</p>
              {block.cite ? (
                <cite className="mt-2 block text-sm not-italic">— {block.cite}</cite>
              ) : null}
            </blockquote>
          );
        }

        return (
          <figure key={index} className="space-y-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover"
              />
            </div>
            {block.caption ? (
              <figcaption className="text-center text-xs text-muted-foreground">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}

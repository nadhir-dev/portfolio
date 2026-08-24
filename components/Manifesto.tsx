"use client";

import ScrollReveal from "@/components/lightswind/scroll-reveal";

const CONTENT =
  "I'm a full-stack developer based in Algeria, building scalable websites and mobile apps for clients and products alike. Outside of client work, I write and share what I learn about computer science and software engineering.";

export default function Manifesto() {
  return (
    <section id="about" className="px-6 ">
      <ScrollReveal
        containerClassName="max-w-6xl mx-auto py-16"
        textClassName="text-gray-950"
        size="2xl"
        align="center"
      >
        {CONTENT}
      </ScrollReveal>
    </section>
  );
}

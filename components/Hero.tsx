import Image from "next/image";
import { StripedPattern } from "@/components/magicui/striped-pattern";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center"
    >
      <StripedPattern
        className="z-0 text-neutral-900/15"
        width={20}
        height={20}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center pt-28 px-6">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-neutral-900"
          style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
        >
          I&apos;m Nadhir —
          <br />I Ship Reliable apps.
        </h1>

        <p className="mt-6 text-md text-neutral-500 max-w-xl mx-auto leading-relaxed">
          I design and build fast, accessible, production-ready web experiences
          with modern tools like React, Next.js, and TypeScript.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full  backdrop-blur-md border border-white/20 text-white text-sm font-medium  bg-neutral-950 transition-colors"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white/40 text-neutral-900 text-sm font-medium hover:bg-white/70 transition-colors"
          >
            Get in touch
          </a>
        </div>

        <p className="mt-6 text-sm text-neutral-500">Available for freelance</p>
      </div>

      {/* fanned image cards */}
      <div
        className="relative z-10 w-full flex-1 mt-15 md:mt-20 flex items-start justify-center"
        style={{ height: 600 }}
      >
        <div className="absolute left-1/2 top-6 w-[360px] h-[580px] -translate-x-[calc(50%+270px)] -rotate-6 z-3 rounded-2xl overflow-hidden shadow-xl border border-black/5 bg-white">
          <Image
            src="/hero/1.webp"
            alt="Project screenshot 1"
            fill
            className="object-cover"
            sizes="360px"
            loading="eager"
          />
        </div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-4 w-[360px] h-[580px] rounded-2xl overflow-hidden shadow-xl border border-black/5 bg-white">
          <Image
            src="/hero/2.webp"
            alt="Project screenshot 2"
            fill
            className="object-cover"
            sizes="360px"
            loading="eager"
          />
        </div>
        <div className="absolute left-1/2 top-6 w-[360px] h-[580px] translate-x-[calc(-50%+270px)] rotate-6 z-3 rounded-2xl overflow-hidden shadow-xl border border-black/5 bg-white">
          <Image
            src="/hero/3.webp"
            alt="Project screenshot 3"
            fill
            className="object-cover"
            sizes="360px"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

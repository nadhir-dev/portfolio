"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className = "", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`inline-flex items-center justify-center ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
    text: string;
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    className?: string;
    style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
    text,
    delay = 50,
    animateBy = "words",
    direction = "top",
    className = "",
    style,
}) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        const current = ref.current;

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);

    const segments = useMemo(() => {
        return animateBy === "words" ? text.split(" ") : text.split("");
    }, [text, animateBy]);

    return (
        <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
            {segments.map((segment, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        filter: inView ? "blur(0px)" : "blur(10px)",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
                        transition: `all 0.5s ease-out ${i * delay}ms`,
                    }}
                >
                    {segment}
                    {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </p>
    );
};

export default function Hero() {
    return (
        <div
            id="home"
            className="min-h-screen bg-background text-foreground transition-colors"
        >
            {/* Hero Section */}
            <main className="relative flex min-h-[100svh] flex-col px-4 pb-20 pt-64 md:block md:min-h-screen md:p-0">
                {/* Centered Main Name - Always Perfectly Centered */}
                <div className="relative w-full text-center md:absolute md:top-1/2 md:left-1/2 md:w-full md:-translate-x-1/2 md:-translate-y-1/2 md:px-4">
                    <div className="relative text-center">
                        <div>
                            <BlurText
                                text="NADHIR"
                                delay={100}
                                animateBy="letters"
                                direction="top"
                                className="font-bold text-[64px] sm:text-[96px] md:text-[140px] lg:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                                style={{ color: "var(--brand)", fontFamily: "var(--font-mono)" }}
                            />
                        </div>
                        <div>
                            <BlurText
                                text="BENDRAOU"
                                delay={100}
                                animateBy="letters"
                                direction="top"
                                className="font-bold text-[64px] sm:text-[96px] md:text-[140px] lg:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                                style={{ color: "var(--brand)", fontFamily: "var(--font-mono)" }}
                            />
                        </div>

                        {/* Profile Picture */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                                <Image
                                    src="/my-avatar.jpg"
                                    alt="Nadhir Bendraou"
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 65px, (max-width: 768px) 90px, (max-width: 1024px) 110px, 129px"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="relative mt-24 flex justify-center md:absolute md:left-1/2 md:top-full md:mt-16 md:-translate-x-1/2">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 z-0 rounded-full bg-brand/10 blur-xl"
                            />
                            <Button
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("contact")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }
                                className="group relative z-10 flex h-12 items-center gap-3 overflow-hidden rounded-full border border-brand/25 bg-white/95 pl-2 pr-6 text-[15px] font-semibold tracking-tight text-neutral-950 shadow-[0_8px_24px_-12px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_30px_-12px_rgba(59,130,246,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 active:translate-y-0 dark:border-brand/30 dark:bg-neutral-900/95 dark:text-white"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:scale-105 dark:bg-brand dark:text-brand-foreground">
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </span>
                                <span className="relative z-10">Get in touch</span>
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100 dark:via-white/15"
                                />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tagline - Proper Distance Below Hero */}
                <div className="absolute bottom-5 left-1/2 w-full -translate-x-1/2 px-6">
                    <div className="flex justify-center">
                        <BlurText
                            text="Building fast, scalable products across web, desktop, mobile, and AI."
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
                            style={{ fontFamily: "var(--font-sans)" }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
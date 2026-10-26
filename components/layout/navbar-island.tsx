"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Code2,
  HelpCircle,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Terminal,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { site } from "@/data/site";
import { CommandMenuTrigger } from "./command-menu";
import { AnimatedThemeToggler } from "./theme-toggler";

interface MenuItem {
  id: string;
  label: string;
  badge?: string;
  hasDropdown: boolean;
  content?: {
    heading: string;
    subheading?: string;
    items: {
      title: string;
      desc: string;
      icon: React.ElementType;
      href?: string;
      tag?: string;
    }[];
    footer?: {
      title: string;
      label: string;
      icon: React.ElementType;
    };
  };
}

const navItems: MenuItem[] = [
  {
    id: "about",
    label: "About",
    hasDropdown: true,
    content: {
      heading: "About me",
      subheading: "Full-stack developer and ESI SBA student",
      items: [
        {
          title: "My story",
          desc: "Building fast, scalable products across web, desktop, mobile, and AI.",
          icon: Zap,
          href: "/#about",
          tag: "Bio",
        },
        {
          title: "FAQ",
          desc: "Common questions about services, process, and availability.",
          icon: HelpCircle,
          href: "/#faq",
        },
        {
          title: "How I work",
          desc: "Clear communication, milestones, and reliable delivery.",
          icon: ShieldCheck,
          href: "/#process",
        },
      ],
      footer: {
        title: "Open to remote work",
        label: "Get in touch",
        icon: Terminal,
      },
    },
  },
  {
    id: "projects",
    label: "Projects",
    hasDropdown: true,
    content: {
      heading: "Selected work",
      subheading: "Full-stack products, frontends, and experiments",
      items: [
        {
          title: "Mediora",
          desc: "Healthcare booking platform with real-time availability.",
          icon: Layers,
          href: "/projects/mediora",
        },
        {
          title: "Library System",
          desc: "Online bookstore with a full admin dashboard.",
          icon: Sparkles,
          href: "/projects/library-management-system",
        },
      ],
      footer: {
        title: "More on GitHub",
        label: "View projects",
        icon: BookOpen,
      },
    },
  },
  {
    id: "skills",
    label: "Skills",
    badge: "STACK",
    hasDropdown: true,
    content: {
      heading: "Tech stack",
      subheading: "Full-stack, DevOps, and AI/ML",
      items: [
        {
          title: "Full-stack toolkit",
          desc: "Next.js, ElysiaJS, Bun, Drizzle, Python, and PostgreSQL.",
          icon: Code2,
          href: "/#skills",
        },
        {
          title: "See it in projects",
          desc: "Real products built end to end with this stack.",
          icon: Layers,
          href: "/#projects",
        },
      ],
    },
  },
  { id: "contact", label: "Contact", hasDropdown: false },
];

export function NavbarIsland() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();

  const activeItem = navItems.find((item) => item.id === activeTab);

  useEffect(() => {
    const sectionIds = ["home", ...navItems.map((item) => item.id)];
    let frame: number | null = null;

    const updateActiveSection = () => {
      frame = null;
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "home";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= marker) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(null);
    setHoveredTab(null);
    setMobileOpen(false);

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const footerHref =
    activeItem?.id === "projects"
      ? (site.socials.find((social) => social.name === "GitHub")?.href ?? "#")
      : "/#contact";

  return (
    <div
      className="relative flex items-center justify-center p-4 select-none md:p-8"
      onMouseLeave={() => {
        setActiveTab(null);
        setHoveredTab(null);
      }}
    >
      {/* Floating Island Header Bar */}
      <nav className="relative flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-neutral-200/80 bg-white/80 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-all dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:shadow-[0_8px_32px_rgb(0,0,0,0.4)]">
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex size-8 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white md:hidden [&_svg]:size-4"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isOpen = activeTab === item.id;
            const isHovered = hoveredTab === item.id;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                aria-current={isActive ? "location" : undefined}
                onMouseEnter={() => {
                  setHoveredTab(item.id);
                  if (item.hasDropdown) {
                    setActiveTab(item.id);
                  } else {
                    setActiveTab(null);
                  }
                }}
                onClick={() => scrollToSection(item.id)}
                className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200 ${
                  isOpen || isHovered || isActive
                    ? "text-neutral-950 dark:text-neutral-50"
                    : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-200"
                }`}
              >
                {/* Dynamic Sliding Background Pill */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hover-pill"
                    className="absolute inset-0 z-[-1] rounded-full bg-neutral-200/50 dark:bg-neutral-800/60"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 z-[-1] rounded-full bg-white shadow-sm ring-1 ring-neutral-200/90 dark:bg-neutral-700/80 dark:ring-neutral-600/70"
                  />
                )}

                <span>{item.label}</span>

                {item.badge && (
                  <span className="rounded-md border border-neutral-300/60 bg-neutral-100 px-1 py-0.5 text-[9px] font-mono font-medium text-neutral-600 dark:border-neutral-700/60 dark:bg-neutral-900 dark:text-neutral-400">
                    {item.badge}
                  </span>
                )}

                {item.hasDropdown && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 text-neutral-950 dark:text-neutral-100"
                        : "text-neutral-400 dark:text-neutral-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
          <span
            aria-hidden="true"
            className="mx-1 h-5 w-px bg-neutral-200 dark:bg-neutral-800"
          />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <CommandMenuTrigger />
          <AnimatedThemeToggler
            title="Toggle theme (Tab)"
            className="flex size-8 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white [&_svg]:size-4"
          />
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-4 top-16 z-50 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 p-2 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-neutral-800/80 dark:bg-neutral-950/95 dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? "location" : undefined}
                onClick={() => scrollToSection(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-100 text-neutral-950 shadow-sm ring-1 ring-neutral-200/90 dark:bg-neutral-800 dark:text-neutral-50 dark:ring-neutral-700/70"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.badge && (
                    <span className="rounded-md border border-neutral-300/60 bg-neutral-100 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-600 dark:border-neutral-700/60 dark:bg-neutral-900 dark:text-neutral-400">
                      {item.badge}
                    </span>
                  )}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
              </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Morphing Dropdown Panel */}
      <AnimatePresence>
        {activeItem?.hasDropdown && activeItem.content && (
          <motion.div
            layoutId="dropdown-surface"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
              mass: 0.6,
            }}
            className="absolute top-[76px] z-50 overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/95 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08)] backdrop-blur-2xl ring-1 ring-black/[0.04] dark:border-neutral-800/80 dark:bg-neutral-950/95 dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] dark:ring-white/[0.04]"
          >
            {/* Morphing Inner Frame */}
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 32,
              }}
              className="w-[370px]"
            >
              {/* Header */}
              <div className="p-4 pb-2">
                <div className="mb-2 px-2.5">
                  <p className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 dark:text-neutral-500 font-mono">
                    {activeItem.content.heading}
                  </p>
                  {activeItem.content.subheading && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {activeItem.content.subheading}
                    </p>
                  )}
                </div>

                {/* Items */}
                <div className="space-y-1 mt-2">
                  {activeItem.content.items.map((subItem) => {
                    const Icon = subItem.icon;
                    const href = subItem.href ?? `#${activeItem.id}`;
                    const isExternal = href.startsWith("http");

                    return (
                      <a
                        key={subItem.title}
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={
                          isExternal ? "noopener noreferrer" : undefined
                        }
                        onClick={() => {
                          setActiveTab(null);
                          setHoveredTab(null);
                        }}
                        className="group flex items-start gap-3.5 rounded-2xl p-2.5 transition-all duration-150 hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50 text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:bg-white group-hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:group-hover:border-neutral-700 dark:group-hover:bg-neutral-800 dark:group-hover:text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                              {subItem.title}
                            </span>
                            {subItem.tag && (
                              <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[9px] font-medium text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                                {subItem.tag}
                              </span>
                            )}
                            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all text-neutral-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-neutral-500" />
                          </div>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                            {subItem.desc}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              {activeItem.content.footer && (
                <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/60 px-4 py-2.5 text-[11px] dark:border-neutral-900 dark:bg-neutral-900/40">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {activeItem.content.footer.title}
                  </span>
                  <a
                    href={footerHref}
                    target={footerHref.startsWith("http") ? "_blank" : undefined}
                    rel={
                      footerHref.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setActiveTab(null)}
                    className="flex items-center gap-1 font-medium text-neutral-900 hover:underline dark:text-neutral-200"
                  >
                    <span>{activeItem.content.footer.label}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
